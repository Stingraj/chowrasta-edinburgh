import fs from "fs";
import path from "path";

const htmlPath = "/Users/stingraj/.gemini/antigravity/brain/0e975bad-6111-4eb7-8e14-d683a75bb081/.system_generated/steps/104/content.md";
const html = fs.readFileSync(htmlPath, "utf-8");

// We want to find all images from wp-content/uploads and their nearest text context.
// Let's find all occurrences of 'wp-content/uploads/' in the html
const regex = /https?:\/\/biryanislounge\.com\/wp-content\/uploads\/[^\s"'>]+?\.(?:png|jpg|jpeg)/gi;
let match;
const matches = [];

while ((match = regex.exec(html)) !== null) {
  const url = match[0];
  const index = match.index;
  // Get text context around the URL: 400 chars before, 400 chars after
  const start = Math.max(0, index - 400);
  const end = Math.min(html.length - 1, index + 400);
  const context = html.slice(start, end);
  
  // Clean context a bit (remove HTML tags for readability)
  const cleanContext = context.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extract filename
  const filename = url.split('/').pop();
  
  matches.push({
    filename,
    url,
    context: cleanContext.substring(0, 300)
  });
}

// Filter out duplicates of same filename
const uniqueMatches = [];
const seen = new Set();
for (const m of matches) {
  if (!seen.has(m.filename)) {
    seen.add(m.filename);
    uniqueMatches.push(m);
  }
}

console.log("Total unique upload images found:", uniqueMatches.length);
uniqueMatches.forEach((m, idx) => {
  console.log(`\n--- [${idx+1}] File: ${m.filename} ---`);
  console.log(`URL: ${m.url}`);
  console.log(`Context: ${m.context}`);
});
