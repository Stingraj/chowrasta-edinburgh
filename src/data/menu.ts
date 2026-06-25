

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  // Replace this image by adding the real image with the same file name inside /public/images/menu/
  image: string;
  tag?: string;
}

export const CATEGORIES = [
  "Starters",
  "Snacks",
  "Fried Rice",
  "Biryani’s",
  "Cold Beverages",
  "Desserts",
  "Chai",
];

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: "starter-1",
    name: "Chicken 65",
    price: "6.99",
    category: "Starters",
    description: "Fiery, deep-fried chicken chunks tossed with fresh curry leaves and chillies.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/chicken-65.jpg",
    tag: "Spicy",
  },
  {
    id: "starter-2",
    name: "Chilli Chicken",
    price: "6.99",
    category: "Starters",
    description: "Crispy chicken tossed in a spicy, tangy Indo-Chinese sauce with bell peppers.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/chilli-chicken.jpg",
    tag: "Spicy",
  },
  {
    id: "starter-3",
    name: "Kajju Chicken Pakoda",
    price: "7.49",
    category: "Starters",
    description: "Crunchy golden chicken fritters coated in spices and loaded with cashews.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/kajju-chicken-pakoda.jpg",
  },
  {
    id: "starter-4",
    name: "Chicken Manchurian",
    price: "7.49",
    category: "Starters",
    description: "Crispy chicken bites wok-tossed in a savoury, tangy Manchurian sauce.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/chicken-manchurian.jpg",
  },
  {
    id: "starter-5",
    name: "Butter Garlic Chicken",
    price: "6.99",
    category: "Starters",
    description: "Tender chicken pieces sautéed in aromatic garlic butter and mild spices.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/butter-garlic-chicken.jpg",
  },
  {
    id: "starter-6",
    name: "Chicken Lollipop",
    price: "5.99",
    category: "Starters",
    description: "Flipped chicken wings drummettes fried crisp and served with spicy sauce.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/chicken-lollipop.jpg",
    tag: "Popular",
  },
  {
    id: "starter-7",
    name: "Chicken Tikka",
    price: "5.99",
    category: "Starters",
    description: "Succulent chicken chunks marinated in yoghurt spices and tandoor grilled.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/chicken-tikka.jpg",
  },
  {
    id: "starter-8",
    name: "Chicken Tandoori",
    price: "5.99",
    category: "Starters",
    description: "Classic tandoor-roasted bone-in chicken in a robust red marinade.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/chicken-tandoori.jpg",
  },
  {
    id: "starter-9",
    name: "Mutton Sukha",
    price: "7.99",
    category: "Starters",
    description: "Pan-roasted tender mutton pieces cooked dry with onions and spices.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/mutton-sukha.jpg",
    tag: "Spicy",
  },
  {
    id: "starter-10",
    name: "Gobi 65",
    price: "6.99",
    category: "Starters",
    description: "Crisp-fried spiced cauliflower florets tossed with curry leaves.",
    image: "/images/menu/starters/gobi-manchurian.jpg",
  },
  {
    id: "starter-11",
    name: "Gobi Manchurian",
    price: "7.49",
    category: "Starters",
    description: "Crispy cauliflower tossed in a sweet, spicy, and tangy Manchurian glaze.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/gobi-manchurian.jpg",
    tag: "Popular",
  },
  {
    id: "starter-12",
    name: "Paneer Tikka",
    price: "5.99",
    category: "Starters",
    description: "Cubes of fresh paneer marinated with spices, bell peppers, and grilled.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/starters/paneer-tikka.jpg",
  },

  // SNACKS
  {
    id: "snack-1",
    name: "Punugulu",
    price: "4.49",
    category: "Snacks",
    description: "Deep-fried golden, round rice-lentil fritters — a street side favourite.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/punugulu.jpg",
  },
  {
    id: "snack-2",
    name: "Mirchi Bajji (3)",
    price: "4.49",
    category: "Snacks",
    description: "Thick, spicy green chillies dipped in batter and fried golden-brown.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/mirchi-bajji.jpg",
  },
  {
    id: "snack-3",
    name: "Aloo Bajji (6)",
    price: "3.99",
    category: "Snacks",
    description: "Crispy potato slices in a seasoned gram flour batter, deep fried.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/aloo-bajji.jpg",
  },
  {
    id: "snack-4",
    name: "Stuffed Mirchi Bajji (3)",
    price: "4.99",
    category: "Snacks",
    description: "Spicy chilli fritters stuffed with seasoned chopped onions and peanuts.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/stuffed-mirchi-bajji.jpg",
    tag: "Spicy",
  },
  {
    id: "snack-5",
    name: "Egg Bonda (4)",
    price: "4.99",
    category: "Snacks",
    description: "Hard-boiled eggs coated in gram flour batter and fried till crisp.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/egg-bonda.jpg",
  },
  {
    id: "snack-6",
    name: "Aloo Samosa Big (2)",
    price: "3.99",
    category: "Snacks",
    description: "Giant crispy pastry shells stuffed with spiced potatoes and peas.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/aloo-samosa.jpg",
  },
  {
    id: "snack-7",
    name: "Meat Samosa (5)",
    price: "3.99",
    category: "Snacks",
    description: "Delicate pastry triangles stuffed with spiced minced meat and fried.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/meat-samosa.jpg",
  },
  {
    id: "snack-8",
    name: "Veg Spring Rolls (5)",
    price: "3.99",
    category: "Snacks",
    description: "Crisp spring roll wrappers packed with seasoned stir-fried vegetables.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/spring-rolls.jpg",
  },
  {
    id: "snack-9",
    name: "Meat Spring Rolls (5)",
    price: "3.99",
    category: "Snacks",
    description: "Golden, crispy spring rolls loaded with lightly spiced minced meat.",
    image: "/images/menu/snacks/meat-spring-rolls.jpg",
  },
  {
    id: "snack-10",
    name: "Onion Pakora (6)",
    price: "3.99",
    category: "Snacks",
    description: "Shredded onions mixed with gram flour and southern spices, fried crisp.",
    image: "/images/menu/snacks/onion-pakora.jpg",
  },
  {
    id: "snack-11",
    name: "Chicken Pakora (6)",
    price: "4.99",
    category: "Snacks",
    description: "Crispy deep-fried spiced chicken fritters seasoned with ginger and garlic.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/snacks/chicken-pakora.jpg",
  },

  // FRIED RICE
  {
    id: "rice-1",
    name: "Veg Fried Rice",
    price: "6.99",
    category: "Fried Rice",
    description: "Fragrant basmati rice wok-tossed with fresh seasonal vegetables.",
    image: "/images/menu/veg/veg-fried-rice.jpg",
  },
  {
    id: "rice-2",
    name: "Mushroom Fried Rice",
    price: "7.49",
    category: "Fried Rice",
    description: "Basmati rice wok-fried with tender earthy mushrooms and spring onions.",
    image: "/images/menu/veg/mushroom-fried-rice.jpg",
  },
  {
    id: "rice-3",
    name: "Paneer Fried Rice",
    price: "7.99",
    category: "Fried Rice",
    description: "Savory wok-tossed basmati rice featuring golden-pan-fried paneer cubes.",
    image: "/images/menu/veg/paneer-fried-rice.jpg",
  },
  {
    id: "rice-4",
    name: "Egg Fried Rice",
    price: "7.99",
    category: "Fried Rice",
    description: "Aromatic basmati rice tossed with scrambled eggs and fresh scallions.",
    image: "/images/menu/non-veg/egg-fried-rice.jpg",
  },
  {
    id: "rice-5",
    name: "Chicken Egg Fried Rice",
    price: "8.99",
    category: "Fried Rice",
    description:
      "Rich combination of shredded chicken, scrambled eggs, and veggies stir-fried with rice.",
    image: "/images/menu/non-veg/chicken-egg-fried-rice.jpg",
  },
  {
    id: "rice-6",
    name: "Schezwan Veg Fried Rice",
    price: "7.49",
    category: "Fried Rice",
    description: "Wok-tossed rice and vegetables with a spicy hit of Schezwan sauce.",
    image: "/images/menu/veg/schezwan-veg-fried-rice.jpg",
  },
  {
    id: "rice-7",
    name: "Schezwan Egg Fried Rice",
    price: "8.49",
    category: "Fried Rice",
    description: "Spicy Schezwan-style rice tossed with scrambled eggs and chillies.",
    image: "/images/menu/non-veg/schezwan-egg-fried-rice.jpg",
  },
  {
    id: "rice-8",
    name: "Schezwan Chicken Fried Rice",
    price: "9.49",
    category: "Fried Rice",
    description: "Fiery fried rice with chicken chunks, eggs, and rich Schezwan seasoning.",
    image: "/images/menu/non-veg/schezwan-chicken-fried-rice.jpg",
  },
  {
    id: "rice-9",
    name: "Keema Rice",
    price: "9.49",
    category: "Fried Rice",
    description: "Aromatic, spiced rice wok-tossed with delicious seasoned minced meat.",
    image: "/images/menu/non-veg/keema-rice.jpg",
  },

  // BIRYANI'S
  {
    id: "biryani-1",
    name: "Hyderabad Chicken Dum Biryani",
    price: "10.99",
    category: "Biryani’s",
    description: "Our crown jewel — premium basmati slow-cooked with spiced marinated chicken.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/chicken-dum-biryani.jpg",
    tag: "Dum Special",
  },
  {
    id: "biryani-2",
    name: "Hyderabad Paneer Biryani",
    price: "10.99",
    category: "Biryani’s",
    description: "Fragrant basmati layered with soft spiced paneer, slow-cooked in dum style.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/paneer-biryani.jpg",
  },
  {
    id: "biryani-3",
    name: "Hyderabad Mutton Biryani",
    price: "12.99",
    category: "Biryani’s",
    description: "Aged basmati and tender marinated mutton slow-sealed and dum-cooked.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/hyderabad-mutton-biryani.jpg",
    tag: "Popular",
  },
  {
    id: "biryani-4",
    name: "Chicken Fry Piece Biryani",
    price: "11.99",
    category: "Biryani’s",
    description: "Flavourful biryani rice served with crispy, seasoned bone-in fried chicken.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/chicken-fry-piece-biryani.jpg",
  },
  {
    id: "biryani-5",
    name: "Chicken 65 Biryani",
    price: "11.99",
    category: "Biryani’s",
    description: "A delicious combination of spiced biryani rice topped with fiery Chicken 65.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/chicken-65-biryani.jpg",
    tag: "Spicy",
  },
  {
    id: "biryani-6",
    name: "Chicken Lollipop Biryani",
    price: "11.99",
    category: "Biryani’s",
    description: "Savory biryani rice served alongside crispy, seasoned chicken lollipops.",
    image: "/images/menu/starters/chicken-lollipop.jpg",
  },
  {
    id: "biryani-7",
    name: "Chicken Tikka Biryani",
    price: "11.99",
    category: "Biryani’s",
    description: "Smoky, tandoor-grilled chicken tikka chunks layered in aromatic dum rice.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/chicken-tikka-biryani.jpg",
  },
  {
    id: "biryani-8",
    name: "Chicken Tandoori Biryani",
    price: "11.99",
    category: "Biryani’s",
    description: "Flame-grilled tandoori chicken piece served over a bed of fragrant biryani.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/chicken-tandoori-biryani.jpg",
  },
  {
    id: "biryani-9",
    name: "Gongura Mutton Biryani",
    price: "13.99",
    category: "Biryani’s",
    description:
      "Spicy mutton biryani combined with the sour, tangy punch of sorrel (gongura) leaves.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/gongura-mutton-biryani.jpg",
  },
  {
    id: "biryani-10",
    name: "Gongura Chicken Biryani",
    price: "12.99",
    category: "Biryani’s",
    description: "A classic Andhra speciality - chicken cooked with gongura leaves and basmati.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/biryani/gongura-chicken-biryani.jpg",
  },
  {
    id: "biryani-11",
    name: "Gongura Paneer Biryani",
    price: "12.99",
    category: "Biryani’s",
    description: "Soft paneer in a tangy, spiced gongura paste layered with biryani rice.",
    image: "/images/menu/biryani/paneer-biryani.jpg",
  },
  {
    id: "biryani-12",
    name: "Pulav Rice with Chicken Fry",
    price: "10.99",
    category: "Biryani’s",
    description: "Aromatic, mild pulav rice paired with spicy, deep-fried chicken pieces.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/non-veg/pulav-rice-with-chicken-fry.jpg",
  },
  {
    id: "biryani-13",
    name: "Pulav Rice with Mutton Curry",
    price: "12.99",
    category: "Biryani’s",
    description: "Fragrant pulav rice served with a slow-cooked, rich and spicy mutton gravy.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/non-veg/pulav-rice-with-mutton-curry.jpg",
  },
  {
    id: "biryani-14",
    name: "Pulav Rice with Gongura Mutton Curry",
    price: "13.99",
    category: "Biryani’s",
    description:
      "Mild pulav rice served with traditional mutton curry cooked in sour sorrel leaves.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/non-veg/pulav-rice-with-gongura-mutton-curry.jpg",
  },
  {
    id: "biryani-15",
    name: "Avakaya Chicken Biryani",
    price: "13.99",
    category: "Biryani’s",
    description: "Fragrant basmati rice dum-cooked with spicy, tangy Andhra mango pickle (avakaya) chicken.",
    image: "/images/menu/biryani/chicken-dum-biryani.jpg",
    tag: "Spicy",
  },
  {
    id: "biryani-16",
    name: "Avakaya Mutton Biryani",
    price: "18.99",
    category: "Biryani’s",
    description: "Tender mutton slow-cooked with basmati rice and bold, tangy Andhra avakaya mango pickle.",
    image: "/images/menu/biryani/hyderabad-mutton-biryani.jpg",
    tag: "Spicy",
  },

  // COLD BEVERAGES
  {
    id: "beverage-1",
    name: "Mango Lassi",
    price: "4.49",
    category: "Cold Beverages",
    description: "Classic sweet yoghurt drink blended with rich, ripe mango pulp.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/drinks/mango-lassi.jpg",
    tag: "Student Favourite",
  },
  {
    id: "beverage-2",
    name: "Oreo Milk Shake",
    price: "4.99",
    category: "Cold Beverages",
    description: "Creamy, rich milkshake blended with crushed Oreos and vanilla ice cream.",
    image: "/images/menu/drinks/oreo-milk-shake.jpg",
  },
  {
    id: "beverage-3",
    name: "Snicker Milkshake",
    price: "4.99",
    category: "Cold Beverages",
    description: "Smooth milkshake filled with chocolate, caramel, and peanut flavours.",
    image: "/images/menu/drinks/snicker-milkshake.jpg",
  },
  {
    id: "beverage-4",
    name: "Biscoff Milkshake",
    price: "4.99",
    category: "Cold Beverages",
    description: "Indulgent blend of cookie butter, crushed Biscoff, and vanilla ice cream.",
    image: "/images/menu/drinks/biscoff-milkshake.jpg",
  },
  {
    id: "beverage-5",
    name: "Kinder Bueno Milkshake",
    price: "4.99",
    category: "Cold Beverages",
    description: "Creamy milkshake made with delicious Kinder Bueno hazelnut chocolate.",
    image: "/images/menu/drinks/kinder-bueno-milkshake.jpg",
  },
  {
    id: "beverage-6",
    name: "Ferrero Rocher Milkshake",
    price: "5.49",
    category: "Cold Beverages",
    description: "Premium chocolate milkshake made with actual Ferrero Rocher truffles.",
    image: "/images/menu/drinks/ferrero-rocher-milkshake.jpg",
  },
  {
    id: "beverage-7",
    name: "Strawberry Milkshake",
    price: "5.99",
    category: "Cold Beverages",
    description: "Sweet, creamy milkshake blended with ripe strawberries and ice cream.",
    image: "/images/menu/drinks/strawberry-milkshake.jpg",
  },
  {
    id: "beverage-8",
    name: "Chippy Spl Berry Milkshake",
    price: "5.99",
    category: "Cold Beverages",
    description: "House special blend milkshake packed with wild forest berries.",
    image: "/images/menu/drinks/chippy-spl-berry-milkshake.jpg",
  },

  // DESSERTS
  {
    id: "dessert-1",
    name: "Rasgulla",
    price: "1.99",
    category: "Desserts",
    description: "Soft, spongy cheese balls soaked in a sweet cardamom sugar syrup.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/desserts/rasgulla.jpg",
  },
  {
    id: "dessert-2",
    name: "Gulab Jamun",
    price: "1.99",
    category: "Desserts",
    description: "Golden fried milk dumplings soaked in warm rose and cardamom syrup.",
    image: "/images/menu/desserts/gulab-jamun.jpg",
    tag: "Popular",
  },
  {
    id: "dessert-3",
    name: "Gajar Ka Halwa",
    price: "3.99",
    category: "Desserts",
    description: "Traditional slow-cooked sweet carrot pudding enriched with ghee and nuts.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/desserts/gajar-halwa.jpg",
  },

  // CHAI
  {
    id: "chai-1",
    name: "Chowrasta Chai",
    price: "1.99",
    category: "Chai",
    description: "Rich, authentic Hyderabadi cutting chai brewed with spices and milk.",
    // Replace this image by adding the real image with the same file name inside /public/images/menu/
    image: "/images/menu/drinks/chowrasta-chai.jpg",
    tag: "Popular",
  },
];

export interface ComboItem {
  name: string;
  price: string;
  description: string;
  image: string;
  imageParts?: string[];
}

export const COMBO_ITEMS: ComboItem[] = [
  {
    name: "Chicken Fry + Hyderabad Dum Biryani",
    price: "13.99",
    description: "Crispy southern chicken fry served alongside our signature chicken dum biryani.",
    image: "/images/menu/non-veg/chicken-fry.jpg",
    imageParts: ["/images/menu/non-veg/chicken-fry.jpg", "/images/menu/biryani/chicken-dum-biryani.jpg"],
  },
  {
    name: "Chicken 65 + Hyderabad Dum Biryani",
    price: "13.99",
    description:
      "The ultimate combo pairing fiery Chicken 65 bites with royal chicken dum biryani.",
    image: "/images/menu/starters/chicken-65.jpg",
    imageParts: ["/images/menu/starters/chicken-65.jpg", "/images/menu/biryani/chicken-dum-biryani.jpg"],
  },
  {
    name: "Chicken Lollipop + Hyderabad Dum Biryani",
    price: "13.99",
    description:
      "Two crowd favourites: crispy chicken lollipops and our slow-cooked chicken dum biryani.",
    image: "/images/menu/starters/chicken-lollipop.jpg",
    imageParts: ["/images/menu/starters/chicken-lollipop.jpg", "/images/menu/biryani/chicken-dum-biryani.jpg"],
  },
  {
    name: "Chilli Chicken + Hyderabad Dum Biryani",
    price: "13.99",
    description:
      "Indo-Chinese style chilli chicken served together with aromatic chicken dum biryani.",
    image: "/images/menu/starters/chilli-chicken.jpg",
    imageParts: ["/images/menu/starters/chilli-chicken.jpg", "/images/menu/biryani/chicken-dum-biryani.jpg"],
  },
  {
    name: "Add a Drink Combo",
    price: "15.49",
    description: "Combine your favourite Biryani combo with a refreshing Mango Lassi or Milkshake.",
    image: "/images/menu/drinks/mango-lassi.jpg",
    imageParts: [
      "/images/menu/biryani/chicken-dum-biryani.jpg",
      "/images/menu/drinks/mango-lassi.jpg",
      "/images/menu/drinks/milkshake.jpg",
    ],
  },
];
