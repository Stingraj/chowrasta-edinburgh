import { createClient } from "@sanity/client";
import process from "node:process";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("Error: SANITY_AUTH_TOKEN environment variable is not defined.");
  console.log("Please retrieve a Write Token from your Sanity dashboard (https://manage.sanity.io/projects/61l4y3x0/api) and run:");
  console.log("SANITY_AUTH_TOKEN=\"your_token\" node scratch/seed.js");
  process.exit(1);
}

const client = createClient({
  projectId: "61l4y3x0",
  dataset: "production",
  apiVersion: "2024-03-11",
  token: token,
  useCdn: false,
});

const sampleHero = {
  _id: "hero_content",
  _type: "hero",
  eyebrow: "Authentic Hyderabadi",
  title: "Dum Biryani",
  subtitle: "Where spice meets\nflavor.",
  description: "From Hyderabad's lively crossroads to the heart of Edinburgh, we serve slow-cooked dum biryani with the depth, warmth, and royal character it has carried for generations.",
  ctaPrimaryText: "View Menu",
};

const sampleFeatures = [
  { _id: "feature_1", _type: "feature", title: "Authentic Recipe", description: "Traditional Hyderabadi recipes passed down with love", order: 1 },
  { _id: "feature_2", _type: "feature", title: "Fresh Ingredients", description: "Premium spices sourced and freshly ground daily", order: 2 },
  { _id: "feature_3", _type: "feature", title: "Made Daily", description: "Every biryani is dum-cooked fresh for each service", order: 3 },
  { _id: "feature_4", _type: "feature", title: "Halal & Hygienic", description: "100% Halal, prepared with utmost care and hygiene", order: 4 },
];

const sampleStory = {
  _id: "story_content",
  _type: "story",
  eyebrow: "Our Story",
  title: "From Old Hyderabad\nto Edinburgh",
  paragraphs: [
    "Chowrasta means crossroads, and for us it is where memory, spice, and place come together on one table.",
    "Our story starts in Old Hyderabad, in streets filled with roasted masala, fresh chai, and biryani resting under dum. We bring that same spirit to Edinburgh, where Indian comfort food meets a new city, new people, and new stories.",
    "We cook slowly, marinate deeply, and build every masala for richness rather than shortcuts. Each plate is made to feel warm, generous, and worth sharing.",
    "At Chowrasta, every meal is made to be savoured, shared, and remembered."
  ]
};

const sampleMenuItems = [
  {
    _id: "menu_chicken_65",
    _type: "menuItem",
    name: "Chicken 65",
    price: "6.99",
    category: "starters",
    description: "Fiery, deep-fried chicken chunks tossed with fresh curry leaves and chillies.",
    tags: ["Spicy"],
  },
  {
    _id: "menu_chilli_chicken",
    _type: "menuItem",
    name: "Chilli Chicken",
    price: "6.99",
    category: "starters",
    description: "Crispy chicken tossed in a spicy, tangy Indo-Chinese sauce with bell peppers.",
    tags: ["Spicy"],
  },
  {
    _id: "menu_chicken_dum_biryani",
    _type: "menuItem",
    name: "Chicken Dum Biryani",
    price: "10.49",
    category: "biryanis",
    description: "Our signature biryani—fragrant basmati rice dum-cooked with tender, spiced chicken.",
    tags: ["Popular", "Dum Special"],
  },
  {
    _id: "menu_samosa",
    _type: "menuItem",
    name: "Aloo Samosa",
    price: "4.49",
    category: "streetfood",
    description: "Crispy pastry pockets filled with a spiced potato and pea mixture.",
    tags: ["Vegetarian"],
  },
  {
    _id: "menu_gulab_jamun",
    _type: "menuItem",
    name: "Gulab Jamun",
    price: "3.99",
    category: "desserts",
    description: "Soft, golden milk-solid dumplings soaked in a rose-cardamom syrup.",
  }
];

async function seed() {
  console.log("Seeding Sanity project 61l4y3x0 with sample content...");
  
  try {
    // 1. Seed Hero
    console.log("Uploading Hero...");
    await client.createOrReplace(sampleHero);

    // 2. Seed Story
    console.log("Uploading Story...");
    await client.createOrReplace(sampleStory);

    // 3. Seed Features
    console.log("Uploading Features...");
    for (const feat of sampleFeatures) {
      await client.createOrReplace(feat);
    }

    // 4. Seed Menu Items
    console.log("Uploading Menu Items...");
    for (const item of sampleMenuItems) {
      await client.createOrReplace(item);
    }

    console.log("Sanity project successfully seeded!");
  } catch (error) {
    console.error("Error seeding Sanity project:", error.message);
  }
}

seed();
