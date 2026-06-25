import { createFileRoute } from "@tanstack/react-router";
import { enquirySchema, generateEnquiryEmailHtml } from "@/lib/api/enquiry.functions";
import nodemailer from "nodemailer";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          // Validate the input data using the Zod schema
          const parseResult = enquirySchema.safeParse(body);
          if (!parseResult.success) {
            return new Response(
              JSON.stringify({
                success: false,
                error: "Validation failed",
                details: parseResult.error.format(),
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const data = parseResult.data;

          // Read SMTP Configuration inside handler
          const smtpHost = process.env.SMTP_HOST || "smtp.titan.email";
          const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
          const smtpSecure = process.env.SMTP_SECURE !== "false";
          const smtpUser = process.env.SMTP_USER;
          const smtpPass = process.env.SMTP_PASS;
          const smtpTo = process.env.SMTP_TO || "service@chowrastaedi.com";

          if (!smtpUser || !smtpPass) {
            console.error("SMTP credentials (SMTP_USER/SMTP_PASS) are not defined.");
            return new Response(
              JSON.stringify({
                success: false,
                error: "Email service is temporarily unavailable. Please try again later.",
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // Construct HTML template using the shared helper
          const htmlContent = generateEnquiryEmailHtml(data);

          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          await transporter.sendMail({
            from: `"Chowrasta Enquiry" <${smtpUser}>`,
            to: smtpTo,
            subject: `New Business Enquiry from ${data.name}`,
            html: htmlContent,
            replyTo: data.email,
          });

          return new Response(
            JSON.stringify({
              success: true,
              message: "Enquiry submitted successfully",
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (error) {
          console.error("Error in /api/contact endpoint:", error);
          const msg = error instanceof Error ? error.message : "Internal Server Error";
          return new Response(
            JSON.stringify({
              success: false,
              error: msg,
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
