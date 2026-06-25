import { defineType, defineField } from "sanity";

export default defineType({
  name: "story",
  title: "About / Story Section",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title (Main Heading)",
      type: "string",
    }),
    defineField({
      name: "paragraphs",
      title: "Story Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main Branded Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "secondaryImage",
      title: "Secondary Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
