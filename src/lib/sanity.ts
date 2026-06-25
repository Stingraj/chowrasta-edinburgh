import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

let clientInstance: any = null;

export function getSanityClient() {
  if (!clientInstance) {
    // Read at runtime to support serverless environments (Cloudflare/Vercel) safely
    const projectId = process.env.SANITY_PROJECT_ID || "placeholder";
    const dataset = process.env.SANITY_DATASET || "production";
    
    clientInstance = createClient({
      projectId,
      dataset,
      apiVersion: "2024-03-11",
      useCdn: process.env.NODE_ENV === "production", // bypass CDN for dev to see instant updates
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
