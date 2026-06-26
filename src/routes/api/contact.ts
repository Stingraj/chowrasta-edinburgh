import { createFileRoute } from "@tanstack/react-router";
import { enquirySchema, sendEnquiryEmail } from "@/lib/api/enquiry.functions";

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

          await sendEnquiryEmail(data);

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
