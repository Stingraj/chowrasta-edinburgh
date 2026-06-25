import fs from "fs";

const htmlPath = "/Users/stingraj/.gemini/antigravity/brain/0e975bad-6111-4eb7-8e14-d683a75bb081/.system_generated/steps/82/content.md";
const html = fs.readFileSync(htmlPath, "utf-8");

const lines = html.split('\n');
let printed = 0;
lines.forEach((line, idx) => {
  if (line.includes('biryani') && line.includes('uploads') && printed < 20) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
    printed++;
  }
});
