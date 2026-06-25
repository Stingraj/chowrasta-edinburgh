import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas/schema";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "61l4y3x0";
const dataset = import.meta.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Chowrasta Edinburgh Heritage",

  projectId,
  dataset,

  // Use a custom path for the embedded studio
  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
