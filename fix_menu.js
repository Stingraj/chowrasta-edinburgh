const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

const mapping = {
  // starters
  'chicken-65.jpg': 'starters/chicken-65.jpg',
  'chilli-chicken.jpg': 'starters/chilli-chicken.jpg',
  'kajju-chicken-pakoda.jpg': 'starters/kajju-chicken-pakoda.jpg',
  'chicken-manchurian.jpg': 'starters/chicken-manchurian.jpg',
  'butter-garlic-chicken.jpg': 'starters/butter-garlic-chicken.jpg',
  'chicken-lollipop.jpg': 'starters/chicken-lollipop.jpg',
  'chicken-tikka.jpg': 'starters/chicken-tikka.jpg',
  'chicken-tandoori.jpg': 'starters/chicken-tandoori.jpg',
  'mutton-sukha.jpg': 'starters/mutton-sukha.jpg',
  'gobi-65.jpg': 'starters/gobi-65.jpg',
  'gobi-manchurian.jpg': 'starters/gobi-manchurian.jpg',
  'paneer-tikka.jpg': 'starters/paneer-tikka.jpg',
  
  // snacks
  'punugulu.jpg': 'snacks/punugulu.jpg',
  'mirchi-bajji.jpg': 'snacks/mirchi-bajji.jpg',
  'aloo-bajji.jpg': 'snacks/aloo-bajji.jpg',
  'stuffed-mirchi-bajji.jpg': 'snacks/stuffed-mirchi-bajji.jpg',
  'egg-bonda.jpg': 'snacks/egg-bonda.jpg',
  'aloo-samosa.jpg': 'snacks/aloo-samosa.jpg',
  'meat-samosa.jpg': 'snacks/meat-samosa.jpg',
  'spring-rolls.jpg': 'snacks/spring-rolls.jpg',
  'meat-spring-rolls.jpg': 'snacks/meat-spring-rolls.jpg',
  'onion-pakora.jpg': 'snacks/onion-pakora.jpg',
  'chicken-pakora.jpg': 'snacks/chicken-pakora.jpg',
  
  // veg
  'veg-fried-rice.jpg': 'veg/veg-fried-rice.jpg',
  'mushroom-fried-rice.jpg': 'veg/mushroom-fried-rice.jpg',
  'paneer-fried-rice.jpg': 'veg/paneer-fried-rice.jpg',
  'schezwan-veg-fried-rice.jpg': 'veg/schezwan-veg-fried-rice.jpg',
  'fried-rice.jpg': 'veg/fried-rice.jpg',
  
  // non-veg
  'egg-fried-rice.jpg': 'non-veg/egg-fried-rice.jpg',
  'chicken-egg-fried-rice.jpg': 'non-veg/chicken-egg-fried-rice.jpg',
  'schezwan-egg-fried-rice.jpg': 'non-veg/schezwan-egg-fried-rice.jpg',
  'schezwan-chicken-fried-rice.jpg': 'non-veg/schezwan-chicken-fried-rice.jpg',
  'keema-rice.jpg': 'non-veg/keema-rice.jpg',
  'chicken-fry.jpg': 'non-veg/chicken-fry.jpg',
  'pulav-rice-with-mutton-curry.jpg': 'non-veg/pulav-rice-with-mutton-curry.jpg',
  'pulav-rice-with-chicken-fry.jpg': 'non-veg/pulav-rice-with-chicken-fry.jpg',
  'pulav-rice-with-gongura-mutton-curry.jpg': 'non-veg/pulav-rice-with-gongura-mutton-curry.jpg',
  
  // biryani
  'chicken-dum-biryani.jpg': 'biryani/chicken-dum-biryani.jpg',
  'paneer-biryani.jpg': 'biryani/paneer-biryani.jpg',
  'hyderabad-mutton-biryani.jpg': 'biryani/hyderabad-mutton-biryani.jpg',
  'chicken-fry-piece-biryani.jpg': 'biryani/chicken-fry-piece-biryani.jpg',
  'chicken-65-biryani.jpg': 'biryani/chicken-65-biryani.jpg',
  'chicken-lollipop-biryani.jpg': 'biryani/chicken-lollipop-biryani.jpg',
  'chicken-tikka-biryani.jpg': 'biryani/chicken-tikka-biryani.jpg',
  'chicken-tandoori-biryani.jpg': 'biryani/chicken-tandoori-biryani.jpg',
  'gongura-mutton-biryani.jpg': 'biryani/gongura-mutton-biryani.jpg',
  'gongura-chicken-biryani.jpg': 'biryani/gongura-chicken-biryani.jpg',
  'gongura-paneer-biryani.jpg': 'biryani/gongura-paneer-biryani.jpg',
  
  // desserts
  'gajar-halwa.jpg': 'desserts/gajar-halwa.jpg',
  'gulab-jamun.jpg': 'desserts/gulab-jamun.jpg',
  'rasgulla.jpg': 'desserts/rasgulla.jpg',
  
  // drinks
  'mango-lassi.jpg': 'drinks/mango-lassi.jpg',
  'chowrasta-chai.jpg': 'drinks/chowrasta-chai.jpg',
  'milkshake.jpg': 'drinks/milkshake.jpg',
  'oreo-milk-shake.jpg': 'drinks/oreo-milk-shake.jpg',
  'snicker-milkshake.jpg': 'drinks/snicker-milkshake.jpg',
  'biscoff-milkshake.jpg': 'drinks/biscoff-milkshake.jpg',
  'kinder-bueno-milkshake.jpg': 'drinks/kinder-bueno-milkshake.jpg',
  'ferrero-rocher-milkshake.jpg': 'drinks/ferrero-rocher-milkshake.jpg',
  'strawberry-milkshake.jpg': 'drinks/strawberry-milkshake.jpg',
  'chippy-spl-berry-milkshake.jpg': 'drinks/chippy-spl-berry-milkshake.jpg',
};

for (const [oldName, newName] of Object.entries(mapping)) {
  content = content.replace(new RegExp(`"/images/menu/${oldName}"`, 'g'), `"/images/menu/${newName}"`);
}

fs.writeFileSync('src/data/menu.ts', content);
