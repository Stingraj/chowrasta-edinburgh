import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

let clientInstance: any = null;

export function getSanityClient() {
  if (!clientInstance) {
    // Read at runtime to support serverless environments (Cloudflare/Vercel) safely
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "61l4y3x0";
    const dataset = import.meta.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";
    
    clientInstance = createClient({
      projectId,
      dataset,
      apiVersion: "2024-03-11",
      useCdn: false, // Set to false to ensure all content updates in Sanity go live instantly on refresh
    });
  }
  return clientInstance;
}

export function urlFor(source: any) {
  try {
    const client = getSanityClient();
    return imageUrlBuilder(client).image(source);
  } catch (error) {
    console.error("Error creating Sanity image builder:", error);
    return {
      url: () => typeof source === "string" ? source : "",
    };
  }
}
