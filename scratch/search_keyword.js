import fs from "fs";

const htmlPath = "/Users/stingraj/.gemini/antigravity/brain/0e975bad-6111-4eb7-8e14-d683a75bb081/.system_generated/steps/82/content.md";
const html = fs.readFileSync(htmlPath, "utf-8");

const keywords = ["avakaya", "pickle", "mutton", "chicken", "biryani", "pulao", "pulav", "combo", "starter", "snack"];
keywords.forEach(kw => {
  const count = (html.match(new RegExp(kw, 'gi')) || []).length;
  console.log(`${kw}: ${count} matches`);
});
