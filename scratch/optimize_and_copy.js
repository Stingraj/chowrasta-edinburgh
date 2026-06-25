import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const newMenuDir = "/Users/stingraj/Downloads/chowrasta-edinburgh-heritage-main 2/public/images/newmenu/biryanislounge_com_images_2026-06-17T16-25-54";
const outputDir = "/Users/stingraj/Downloads/chowrasta-edinburgh-heritage-main 2/public/images/menu";

const mappings = {
  "35.png": "chicken-fry-piece-biryani.jpg",
  "30.png": "chicken-65-biryani.jpg",
  "31.png": "chicken-tikka-biryani.jpg",
  "28.png": "chicken-tandoori-biryani.jpg",
  "33.png": "gongura-mutton-biryani.jpg"
};

// Add duplicate mapping for gongura-chicken-biryani.jpg from 33.png
const extraMappings = [
  { src: "33.png", dest: "gongura-chicken-biryani.jpg" }
];

function processImage(srcName, destName) {
  const srcPath = path.join(newMenuDir, srcName);
  const destPath = path.join(outputDir, destName);
  
  if (!fs.existsSync(srcPath)) {
    console.error(`Source image not found: ${srcPath}`);
    return false;
  }
  
  console.log(`Processing: ${srcName} -> ${destName}`);
  try {
    // We use macOS built-in sips tool to convert format to jpeg, compress to 80% quality, and limit max resolution to 800px while maintaining aspect ratio
    const command = `sips -s format jpeg -s formatOptions 80 --resampleHeightWidthMax 800 "${srcPath}" --out "${destPath}"`;
    execSync(command, { stdio: "inherit" });
    console.log(`Successfully processed and copied to: ${destName}`);
    return true;
  } catch (error) {
    console.error(`Error processing image ${srcName}:`, error.message);
    return false;
  }
}

async function run() {
  console.log("Starting image optimization and copying...");
  const results = {};
  
  for (const [src, dest] of Object.entries(mappings)) {
    results[dest] = processImage(src, dest);
  }
  
  for (const mapping of extraMappings) {
    results[mapping.dest] = processImage(mapping.src, mapping.dest);
  }
  
  console.log("\nSummary of image updates:");
  console.log(JSON.stringify(results, null, 2));
}

run();
