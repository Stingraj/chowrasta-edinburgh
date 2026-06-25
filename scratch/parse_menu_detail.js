import fs from "fs";

const htmlPath = "/Users/stingraj/.gemini/antigravity/brain/0e975bad-6111-4eb7-8e14-d683a75bb081/.system_generated/steps/82/content.md";
const html = fs.readFileSync(htmlPath, "utf-8");

// Let's write a script to search for tags and print blocks that look like menu items.
// Typically in WordPress/Elementor, a menu item might look like:
// <div class="title-price">...</div> or similar.
// Let's look at the structure by printing lines containing some key item names like "Gulab Jamun", "Mutton Biryani", etc.
const keywords = ["mutton-biryani", "gulab-jamun", "tikka", "lollipop", "65", "mango-lassi"];

const lines = html.split('\n');
console.log("Total lines:", lines.length);

// Let's find all URLs that end with .png or .jpg or .svg in the HTML
const urlRegex = /https?:\/\/[^\s"'><]+?\.(?:png|jpg|jpeg|gif|svg)/gi;
const urls = new Set();
let match;
while ((match = urlRegex.exec(html)) !== null) {
  urls.add(match[0]);
}

console.log("Found unique URLs:", urls.size);
const fileUrls = Array.from(urls).filter(u => u.includes('wp-content/uploads'));
console.log("wp-content/uploads URLs count:", fileUrls.length);
console.log("First 100 uploads URLs:");
console.log(JSON.stringify(fileUrls.slice(0, 100), null, 2));
