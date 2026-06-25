import fs from "fs";
import path from "path";
import https from "https";

const outputDir = path.resolve("public/images/menu");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Copy local assets
const localAssets = {
  "src/assets/mirchi-bajji.jpg": "mirchi-bajji.jpg",
  "src/assets/punugulu.jpg": "punugulu.jpg",
  "src/assets/chicken65.jpg": "chicken-65.jpg",
  "src/assets/chicken65-biryani.jpg": "chicken-65-biryani.jpg",
  "src/assets/hero-biryani.jpg": "chicken-dum-biryani.jpg",
  "src/assets/chai.jpg": "chowrasta-chai.jpg",
};

for (const [srcPath, destFile] of Object.entries(localAssets)) {
  const src = path.resolve(srcPath);
  const dest = path.join(outputDir, destFile);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied local asset: ${srcPath} -> ${destFile}`);
  } else {
    console.error(`Local asset not found: ${srcPath}`);
  }
}

// 2. Download working alternatives for remaining failed downloads
const ALTERNATIVES = {
  "fried-rice.jpg":
    "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&h=600&q=80",
  "mango-lassi.jpg":
    "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&h=600&q=80",
  "aloo-samosa.jpg":
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&h=600&q=80",
};

function downloadImage(filename, url) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(outputDir, filename);
    const file = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${filename}: HTTP ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Downloaded alternative: ${filename}`);
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
  });
}

async function run() {
  console.log("Starting alternative downloads...");
  for (const [filename, url] of Object.entries(ALTERNATIVES)) {
    try {
      await downloadImage(filename, url);
    } catch (error) {
      console.error(error.message);
    }
  }
  console.log("Finished fixing images!");
}

run();
