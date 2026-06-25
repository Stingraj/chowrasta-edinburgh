import fs from "fs";
import path from "path";
import https from "https";

const IMAGES = {
  "chicken-65.jpg":
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&h=600&q=80",
  "chilli-chicken.jpg":
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&h=600&q=80",
  "chicken-lollipop.jpg":
    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&h=600&q=80",
  "chicken-tikka.jpg":
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&h=600&q=80",
  "chicken-tandoori.jpg":
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&h=600&q=80",
  "mutton-sukha.jpg":
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&h=600&q=80",
  "gobi-manchurian.jpg":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&h=600&q=80",
  "paneer-tikka.jpg":
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&h=600&q=80",
  "punugulu.jpg":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&h=600&q=80",
  "mirchi-bajji.jpg":
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&h=600&q=80",
  "aloo-samosa.jpg":
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&h=600&q=80",
  "spring-rolls.jpg":
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=600&q=80",
  "onion-pakora.jpg":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&h=600&q=80",
  "fried-rice.jpg":
    "https://images.unsplash.com/photo-1603133872878-6967b5469940?auto=format&fit=crop&w=600&h=600&q=80",
  "chicken-dum-biryani.jpg":
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&h=600&q=80",
  "paneer-biryani.jpg":
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&h=600&q=80",
  "mango-lassi.jpg":
    "https://images.unsplash.com/photo-1571115177098-24ec4209e548?auto=format&fit=crop&w=600&h=600&q=80",
  "milkshake.jpg":
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&h=600&q=80",
  "gulab-jamun.jpg":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&h=600&q=80",
  "gajar-halwa.jpg":
    "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=600&h=600&q=80",
  "chowrasta-chai.jpg":
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&h=600&q=80",
};

const outputDir = path.resolve("public/images/menu");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

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
          console.log(`Downloaded: ${filename}`);
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
  console.log("Starting image downloads...");
  for (const [filename, url] of Object.entries(IMAGES)) {
    try {
      await downloadImage(filename, url);
    } catch (error) {
      console.error(error.message);
    }
  }
  console.log("Finished image downloads!");
}

run();
