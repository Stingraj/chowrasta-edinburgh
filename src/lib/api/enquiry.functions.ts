import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import nodemailer from "nodemailer";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  businessName: z.string().min(1, "Business Name is required"),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

const TITAN_SMTP_HOST = "smtp.titan.email";
const TITAN_SMTP_PORT = 587;
const TITAN_SMTP_SECURE = false;
const TITAN_RECIPIENT = "service@chowrastaedi.com";

export function generateEnquiryEmailHtml(data: EnquiryInput): string {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Business Enquiry</title>
          <style>
            body {
              font-family: 'Inter', system-ui, sans-serif;
              color: #2b2b2a;
              background-color: #fbf9f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border: 1px solid #c5a059;
              border-radius: 4px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(26, 60, 42, 0.08);
            }
            .header {
              background-color: #1a3c2a;
              padding: 30px;
              text-align: center;
              border-bottom: 3px solid #c5a059;
            }
            .header h1 {
              color: #fbf9f4;
              margin: 0;
              font-size: 24px;
              letter-spacing: 0.1em;
              font-weight: 500;
              text-transform: uppercase;
            }
            .content {
              padding: 30px;
            }
            .field-row {
              margin-bottom: 20px;
              border-bottom: 1px solid #e5dfd3;
              padding-bottom: 12px;
            }
            .field-label {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #c5a059;
              font-weight: 600;
              margin-bottom: 4px;
            }
            .field-value {
              font-size: 16px;
              color: #1a3c2a;
              font-weight: 500;
            }
            .message-box {
              background-color: #f5eedc;
              border-left: 4px solid #c5a059;
              padding: 15px 20px;
              margin-top: 25px;
              border-radius: 0 4px 4px 0;
            }
            .message-title {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #1a3c2a;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .message-text {
              font-size: 15px;
              line-height: 1.6;
              white-space: pre-wrap;
              margin: 0;
              color: #2b2b2a;
            }
            .footer {
              background-color: #fbf9f4;
              padding: 20px 30px;
              text-align: center;
              font-size: 12px;
              color: #8a8882;
              border-top: 1px solid #e5dfd3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Chowrasta Edinburgh</h1>
            </div>
            <div class="content">
              <div class="field-row">
                <div class="field-label">Name</div>
                <div class="field-value">${data.name}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${data.email}" style="color: #c5a059; text-decoration: none;">${data.email}</a></div>
              </div>
              <div class="field-row">
                <div class="field-label">Phone</div>
                <div class="field-value"><a href="tel:${data.phone}" style="color: #c5a059; text-decoration: none;">${data.phone}</a></div>
              </div>
              <div class="field-row">
                <div class="field-label">Company</div>
                <div class="field-value">${data.businessName}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Enquiry Type</div>
                <div class="field-value" style="font-weight: bold; color: #822f16;">${data.enquiryType}</div>
              </div>
              
              <div class="message-box">
                <div class="message-title">Enquiry Message</div>
                <p class="message-text">${data.message}</p>
              </div>
            </div>
            <div class="footer">
              This email was sent automatically from the Chowrasta Edinburgh website.
            </div>
          </div>
        </body>
      </html>
  `;
}

function getTitanCredentials() {
  const user = process.env.TITAN_EMAIL;
  const pass = process.env.TITAN_PASSWORD;

  if (!user || !pass) {
    console.error("Titan credentials (TITAN_EMAIL/TITAN_PASSWORD) are not defined.");
    throw new Error("Email service is temporarily unavailable. Please try again later.");
  }

  return { user, pass };
}

export async function sendEnquiryEmail(data: EnquiryInput) {
  const { user, pass } = getTitanCredentials();
  const htmlContent = generateEnquiryEmailHtml(data);

  const transporter = nodemailer.createTransport({
    host: TITAN_SMTP_HOST,
    port: TITAN_SMTP_PORT,
    secure: TITAN_SMTP_SECURE,
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Chowrasta Enquiry" <${user}>`,
      to: TITAN_RECIPIENT,
      subject: `New Contact Enquiry from ${data.name}`,
      html: htmlContent,
      replyTo: data.email,
    });
  } catch (error) {
    console.error("Nodemailer SMTP mail delivery failed:", error);
    throw error;
  }

  return { success: true };
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator(enquirySchema)
  .handler(async ({ data }) => {
    try {
      return await sendEnquiryEmail(data);
    } catch (error) {
      console.error("Error in submitEnquiry server function:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send email enquiry via SMTP.";
      throw new Error(errorMessage);
    }
  });
