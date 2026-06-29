import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { name, phone, email, businessName, enquiryType, message } = body;

          if (!name || !email || !message) {
            return new Response(
              JSON.stringify({ success: false, error: "Missing required fields" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const transporter = nodemailer.createTransport({
            host: "smtp.titan.email",
            port: 587,
            secure: false,
            auth: {
              user: process.env.TITAN_EMAIL,
              pass: process.env.TITAN_PASSWORD,
            },
          });

          const mailOptions = {
            from: `"Chowrasta Enquiry" <${process.env.TITAN_EMAIL}>`,
            to: process.env.TO_EMAIL || "info@chowrastaedi.com",
            replyTo: email,
            subject: `New Contact Enquiry from ${name}`,
            html: `
              <div style="font-family: sans-serif; color: #333;">
                <h2 style="color: #c5a059;">New Contact Enquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone || "N/A"}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${businessName || "N/A"}</p>
                <p><strong>Enquiry Type:</strong> ${enquiryType || "N/A"}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #c5a059; margin-top: 10px; white-space: pre-wrap;">
                  ${message}
                </div>
              </div>
            `,
          };

          await transporter.sendMail(mailOptions);

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          const msg = error instanceof Error ? error.message : "Internal Server Error";
          return new Response(JSON.stringify({ success: false, error: msg }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
