import fs from "fs";

const htmlPath = "/Users/stingraj/.gemini/antigravity/brain/0e975bad-6111-4eb7-8e14-d683a75bb081/.system_generated/steps/104/content.md";
const html = fs.readFileSync(htmlPath, "utf-8");

const urlRegex = /https?:\/\/[^\s"'><]+?\.(?:png|jpg|jpeg|gif|svg)/gi;
const urls = new Set();
let match;
while ((match = urlRegex.exec(html)) !== null) {
  urls.add(match[0]);
}

console.log("Found unique URLs in menu page:", urls.size);
const fileUrls = Array.from(urls).filter(u => u.includes('wp-content/uploads'));
console.log("wp-content/uploads URLs count in menu page:", fileUrls.length);

// Let's write a script to extract text and adjacent image src in the HTML.
// For example, finding all matches of <h3 ...> or similar and nearby img tags.
// Let's split by '<' and search for elements.
const lines = html.split('\n');
console.log("Total lines in menu page:", lines.length);

const results = [];
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('biryani') || line.toLowerCase().includes('starter') || line.toLowerCase().includes('dessert') || line.toLowerCase().includes('drink')) {
    const start = Math.max(0, idx - 8);
    const end = Math.min(lines.length - 1, idx + 8);
    const context = lines.slice(start, end + 1).map(l => l.trim()).join(' | ');
    results.push({
      lineNum: idx + 1,
      line: line.trim(),
      context: context.substring(0, 500)
    });
  }
});

console.log("Found", results.length, "results in menu page:");
console.log(JSON.stringify(results.slice(0, 30), null, 2));
