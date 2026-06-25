import fs from "fs";
import path from "path";

const htmlPath = "/Users/stingraj/.gemini/antigravity/brain/0e975bad-6111-4eb7-8e14-d683a75bb081/.system_generated/steps/82/content.md";
const html = fs.readFileSync(htmlPath, "utf-8");

// Let's find all matches of img src and adjacent text
// Or let's print all image URLs and their surrounding text in 200 chars
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let match;
const results = [];

// Simple regex search for menu item names and their images
// Let's search for some keywords like "Biryani", "Lollipop", "Tikka", "Tandoori", "Gongura", "Pulao", "Pickle", "Combo", "Starter", "Snack", "Rice", "Dessert"
const keywords = [
  "Biryani", "Lollipop", "65", "Tikka", "Tandoori", "Gongura", "Pulao", "Pulav", 
  "Pickle", "Combo", "Starter", "Snack", "Fried Rice", "Dessert", "Gulab", "Halwa", "Lassi"
];

const lines = html.split('\n');
lines.forEach((line, index) => {
  keywords.forEach(keyword => {
    if (line.toLowerCase().includes(keyword.toLowerCase())) {
      // Find nearby lines
      const start = Math.max(0, index - 5);
      const end = Math.min(lines.length - 1, index + 5);
      const context = lines.slice(start, end + 1).join('\n');
      if (context.includes('wp-content/uploads') || context.includes('<img')) {
        results.push({
          keyword,
          lineNum: index + 1,
          line: line.trim(),
          context: lines.slice(index - 2, index + 3).map(l => l.trim()).join(' | ')
        });
      }
    }
  });
});

console.log("Found", results.length, "results:");
console.log(JSON.stringify(results.slice(0, 50), null, 2));
