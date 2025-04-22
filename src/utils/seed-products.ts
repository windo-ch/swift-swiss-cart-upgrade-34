
import { Product } from '../types/product';

// Assign a unique ID for each product
let idCounter = 1000;

// Helper function to create product objects
const createProduct = (
  name: string, 
  price: number, 
  category: string, 
  description: string,
  ageRestricted: boolean = false,
  image: string = ''
): Product => {
  return {
    id: String(idCounter++),
    name,
    price,
    category,
    description,
    image: image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
    ageRestricted,
    stock: 50
  };
};

// Function to initialize products data from the brings-delivery.ch product list
export const seedProductsData = (): Product[] => {
  console.log("🌱 Seeding products data...");
  
  // Create the soft drinks products
  const softDrinks = [
    createProduct("Valser Prickelnd", 2.50, "soft-drinks", "Valser sparkling water", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3282.jpg"),
    createProduct("Valser Still", 2.50, "soft-drinks", "Valser still water", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3281.jpg"),
    createProduct("Lauretana mit Kohlensäure", 3.50, "soft-drinks", "Lauretana sparkling water", false, "https://brings-delivery.ch/cdn/shop/products/lauretana-mit-kohlensaeure.jpg"),
    createProduct("Lauretana ohne Kohlensäure", 3.50, "soft-drinks", "Lauretana still water", false, "https://brings-delivery.ch/cdn/shop/products/lauretana-ohne-kohlensaeure.jpg"),
    createProduct("AriZona Honey Ice Tea", 3.50, "soft-drinks", "AriZona Honey Ice Tea", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3230.jpg"),
    createProduct("AriZona Honey Ice Tea 1.5L", 6.50, "soft-drinks", "AriZona Honey Ice Tea in a 1.5L bottle", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3221.jpg"),
    createProduct("AriZona Pfirsich Ice Tea 1.5L", 6.50, "soft-drinks", "AriZona Peach Ice Tea in a 1.5L bottle", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3223.jpg"),
    createProduct("Capri-Sun Multivitamin", 2.00, "soft-drinks", "Capri-Sun Multivitamin juice drink", false, "https://brings-delivery.ch/cdn/shop/products/capri-sun-multivitamin_1.jpg"),
    createProduct("Coca Cola 1.5l", 5.90, "soft-drinks", "Coca Cola in a 1.5L bottle", false, "https://brings-delivery.ch/cdn/shop/products/IMG_5246.jpg"),
    createProduct("Coca Cola Zero", 2.50, "soft-drinks", "Coca Cola Zero", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3269.jpg"),
    createProduct("Coca-Cola Classic", 2.50, "soft-drinks", "Coca-Cola Classic", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3267.jpg"),
    createProduct("Fanta 1.5l", 5.90, "soft-drinks", "Fanta in a 1.5L bottle", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3211.jpg"),
    createProduct("San Bedetto Ice Tea Lemon", 2.50, "soft-drinks", "San Benedetto Lemon Ice Tea", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3258.jpg"),
    createProduct("San Benedetto Ice Tea Pfirsich", 2.50, "soft-drinks", "San Benedetto Peach Ice Tea", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3259.jpg"),
    createProduct("Sinalco Original", 2.50, "soft-drinks", "Sinalco Original soft drink", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3254.jpg"),
    createProduct("Uludag Original", 2.50, "soft-drinks", "Uludag Original soft drink", false, "https://brings-delivery.ch/cdn/shop/products/uludag-original-0-33l_1.jpg")
  ];

  // Create the energy drinks
  const energyDrinks = [
    createProduct("Red Bull Original", 3.50, "energy-drinks", "Red Bull Original energy drink", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3239.jpg"),
    createProduct("Red Bull Sugarfree", 3.50, "energy-drinks", "Red Bull Sugarfree energy drink", false, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3241.jpg")
  ];

  // Create the snacks products
  const snacks = [
    createProduct("Zweifel Nature Chips", 4.90, "chips-snacks", "Zweifel Nature flavored chips", false, "https://brings-delivery.ch/cdn/shop/products/zweifel-nature-chips.jpg"),
    createProduct("Zweifel Paprika Chips", 4.90, "chips-snacks", "Zweifel Paprika flavored chips", false, "https://brings-delivery.ch/cdn/shop/products/zweifel-paprika-chips.jpg"),
    createProduct("Fonzies Original Käse Chips", 4.90, "chips-snacks", "Fonzies Original Cheese flavored chips", false, "https://brings-delivery.ch/cdn/shop/products/fonzies-original-kaese-chips.jpg"),
    createProduct("Granforno Grissini Traditionell", 5.90, "chips-snacks", "Granforno Traditional Grissini breadsticks", false, "https://brings-delivery.ch/cdn/shop/products/granforno-grissini-traditionell.jpg"),
    createProduct("Nippon Hosta", 4.90, "chips-snacks", "Nippon Hosta snack", false, "https://brings-delivery.ch/cdn/shop/products/nippon-hosta.jpg"),
    createProduct("Smoki Erdnuss Flips", 3.90, "chips-snacks", "Smoki Peanut Flips", false, "https://brings-delivery.ch/cdn/shop/products/smoki-erdnuss-flips.jpg"),
    createProduct("TUC Original LU gesalzen", 2.90, "chips-snacks", "TUC Original LU salted crackers", false, "https://brings-delivery.ch/cdn/shop/products/tuc-original-lu-gesalzen.jpg")
  ];

  // Create the sweets products
  const sweets = [
    createProduct("Kinder Schokolade Stk.Preis", 0.70, "sweets", "Kinder Chocolate, price per piece", false, "https://brings-delivery.ch/cdn/shop/products/kinder-schokolade-stk-preis.jpg"),
    createProduct("Kinder-Bueno (Einzeler Riegel)", 1.60, "sweets", "Kinder Bueno chocolate bar", false, "https://brings-delivery.ch/cdn/shop/products/kinder-bueno-einzeler-riegel.jpg"),
    createProduct("Kinder-Milchschnitte", 1.20, "sweets", "Kinder Milk Slice", false, "https://brings-delivery.ch/cdn/shop/products/kinder-milchschnitte.jpg"),
    createProduct("Oreo Original", 4.90, "sweets", "Oreo Original cookies", false, "https://brings-delivery.ch/cdn/shop/products/oreo-original.jpg")
  ];

  // Create the non-food products
  const nonFood = [
    createProduct("Babywindel Gr.4 (8 Stk.)", 5.50, "non-food", "Baby diapers, size 4, pack of 8", false, "https://brings-delivery.ch/cdn/shop/products/babywindel-gr-4-8-stk.jpg"),
    createProduct("Kosmetiktücher-Box", 4.90, "non-food", "Box of facial tissues", false, "https://brings-delivery.ch/cdn/shop/products/kosmetiktuecher-box.jpg"),
    createProduct("o.b. Procompfort mini", 3.90, "non-food", "o.b. ProComfort mini tampons", false, "https://brings-delivery.ch/cdn/shop/products/o-b-procomfort-mini.jpg"),
    createProduct("Plastik Shotsbecher", 0.30, "non-food", "Plastic shot glasses", false, "https://brings-delivery.ch/cdn/shop/products/plastik-shotsbecher.jpg"),
    createProduct("Plastikbecher", 0.30, "non-food", "Plastic cups", false, "https://brings-delivery.ch/cdn/shop/products/plastikbecher.jpg"),
    createProduct("Taschentuch-Packung (2 Stk.)", 2.20, "non-food", "Pack of tissues, 2 pieces", false, "https://brings-delivery.ch/cdn/shop/products/taschentuch-packung-2-stk.jpg"),
    createProduct("WC Papier (1 Rolle)", 2.40, "non-food", "Toilet paper, 1 roll", false, "https://brings-delivery.ch/cdn/shop/products/wc-papier-1-rolle.jpg")
  ];

  // Create the smoking products (age-restricted)
  const tobacco = [
    createProduct("American Spirit Blue Tabak", 11.90, "tobacco", "American Spirit Blue tobacco", true, "https://brings-delivery.ch/cdn/shop/products/american-spirit-blue-tabak.jpg"),
    createProduct("Vogue Slim Blue", 12.90, "tobacco", "Vogue Slim Blue cigarettes", true, "https://brings-delivery.ch/cdn/shop/products/vogue-slim-blue.jpg"),
    createProduct("Sullana Drehtabak", 11.90, "tobacco", "Sullana rolling tobacco", true, "https://brings-delivery.ch/cdn/shop/products/sullana-drehtabak.jpg"),
    createProduct("Parisienne Jaune", 12.90, "tobacco", "Parisienne Jaune cigarettes", true, "https://brings-delivery.ch/cdn/shop/products/parisienne-jaune.jpg"),
    createProduct("Philip Morris Quantum Blue", 13.90, "tobacco", "Philip Morris Quantum Blue cigarettes", true, "https://brings-delivery.ch/cdn/shop/products/philip-morris-quantum-blue.jpg"),
    createProduct("Marlboro Gold", 12.90, "tobacco", "Marlboro Gold cigarettes", true, "https://brings-delivery.ch/cdn/shop/products/marlboro-gold.jpg"),
    createProduct("Marlboro Rot", 12.90, "tobacco", "Marlboro Red cigarettes", true, "https://brings-delivery.ch/cdn/shop/products/marlboro-rot.jpg"),
    createProduct("Smoking Blue King Size", 2.50, "tobacco", "Smoking Blue King Size rolling papers", true, "https://brings-delivery.ch/cdn/shop/products/smoking-blue-king-size.jpg")
  ];

  // Create the beer products (age-restricted)
  const beers = [
    createProduct("Feldschlösschen Original 0.33l", 2.50, "beer", "Original Feldschlösschen beer in a 0.33l bottle", true, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3118.jpg"),
    createProduct("Feldschlösschen Original", 3.50, "beer", "Original Feldschlösschen beer", true, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3119.jpg"),
    createProduct("Quöllfrisch 0.33l", 2.50, "beer", "Quöllfrisch beer in a 0.33l bottle", true, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3125.jpg"),
    createProduct("Quöllfrisch 0.5l", 3.50, "beer", "Quöllfrisch beer in a 0.5l bottle", true, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3124.jpg"),
    createProduct("Birra Ichnusa non Filtre", 3.90, "beer", "Unfiltered Birra Ichnusa beer", true, "https://brings-delivery.ch/cdn/shop/products/birra-ichnusa-non-filtre.jpg"),
    createProduct("Birra Morreti", 2.80, "beer", "Birra Morreti beer", true, "https://brings-delivery.ch/cdn/shop/products/birra-morreti.jpg"),
    createProduct("Desperados Original", 3.60, "beer", "Original Desperados beer", true, "https://brings-delivery.ch/cdn/shop/products/desperados-original.jpg"),
    createProduct("Früh Kölsch 0.33l", 3.50, "beer", "Früh Kölsch beer in a 0.33l bottle", true, "https://brings-delivery.ch/cdn/shop/products/frueh-koelsch-0-33l.jpg"),
    createProduct("Heineken Premium 0.33l", 2.50, "beer", "Heineken Premium beer in a 0.33l bottle", true, "https://brings-delivery.ch/cdn/shop/products/20210825-20210825-IMG_3132.jpg"),
    createProduct("Heineken Premium 0.5l", 3.60, "beer", "Heineken Premium beer in a 0.5l bottle", true, "https://brings-delivery.ch/cdn/shop/products/heineken-premium-0-5l.jpg"),
    createProduct("Mönchshof Kellerbier 0.5l", 3.90, "beer", "Mönchshof Kellerbier in a 0.5l bottle", true, "https://brings-delivery.ch/cdn/shop/products/moenchshof-kellerbier-0-5l.jpg"),
    createProduct("Rothaus Tannenzäpfle 0.33l", 3.20, "beer", "Rothaus Tannenzäpfle beer in a 0.33l bottle", true, "https://brings-delivery.ch/cdn/shop/products/rothaus-tannenzaepfle-0-33l.jpg")
  ];

  // Create the wine/sparkling wine products (age-restricted)
  const wines = [
    createProduct("Bluesecco Blu Rosé Rubicone IGT", 4.20, "wine", "Bluesecco Blu Rosé sparkling wine from the Rubicone region, Italy", true, "https://brings-delivery.ch/cdn/shop/products/bluesecco-blu-rose-rubicone-igt.jpg"),
    createProduct("Bluesecco Blu Trevenezie IGT", 4.20, "wine", "Bluesecco Blu sparkling wine from the Trevenezie region, Italy", true, "https://brings-delivery.ch/cdn/shop/products/bluesecco-blu-trevenezie-igt.jpg")
  ];

  // Create the spirits products (age-restricted)
  const spirits = [
    createProduct("Ballantine's Finest Scotch", 34.00, "spirits", "Ballantine's Finest Scotch Whisky", true, "https://brings-delivery.ch/cdn/shop/products/ballantine-s-finest-scotch.jpg"),
    createProduct("Jack Daniel's Tennessee Whiskey", 49.00, "spirits", "Jack Daniel's Tennessee Whiskey", true, "https://brings-delivery.ch/cdn/shop/products/jack-daniel-s-tennessee-whiskey.jpg"),
    createProduct("Jägermeister 70cl", 39.00, "spirits", "Jägermeister herbal liqueur, 70cl bottle", true, "https://brings-delivery.ch/cdn/shop/products/jaegermeister-70cl.jpg"),
    createProduct("Johnnie Walker Red Label 70cl", 39.00, "spirits", "Johnnie Walker Red Label Scotch Whisky, 70cl bottle", true, "https://brings-delivery.ch/cdn/shop/products/johnnie-walker-red-label-70cl.jpg"),
    createProduct("Vodka Absolut 70cl", 46.00, "spirits", "Absolut Vodka, 70cl bottle", true, "https://brings-delivery.ch/cdn/shop/products/vodka-absolut-70cl.jpg"),
    createProduct("Wodka Gorbatschow 70cl", 26.00, "spirits", "Wodka Gorbatschow, 70cl bottle", true, "https://brings-delivery.ch/cdn/shop/products/wodka-gorbatschow-70cl.jpg")
  ];

  // Combine all products
  const allProducts = [
    ...softDrinks,
    ...energyDrinks,
    ...snacks,
    ...sweets,
    ...nonFood,
    ...tobacco,
    ...beers,
    ...wines,
    ...spirits
  ];

  console.log(`🔄 Successfully seeded ${allProducts.length} products`);
  
  return allProducts;
};
