
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
    id: idCounter++,
    name,
    price,
    category,
    description,
    image: image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
    ageRestricted,
    stock: 50
  };
};

// Function to initialize admin products in localStorage
export const seedProductsData = (): void => {
  console.log("🌱 Seeding products data...");
  
  // Create the soft drinks products
  const softDrinks = [
    createProduct("Valser Prickelnd", 2.50, "soft-drinks", "Valser sparkling water"),
    createProduct("Valser Still", 2.50, "soft-drinks", "Valser still water"),
    createProduct("Lauretana mit Kohlensäure", 3.50, "soft-drinks", "Lauretana sparkling water"),
    createProduct("Lauretana ohne Kohlensäure", 3.50, "soft-drinks", "Lauretana still water"),
    createProduct("AriZona Honey Ice Tea", 3.50, "soft-drinks", "AriZona Honey Ice Tea"),
    createProduct("AriZona Honey Ice Tea 1.5L", 6.50, "soft-drinks", "AriZona Honey Ice Tea in a 1.5L bottle"),
    createProduct("AriZona Pfirsich Ice Tea 1.5L", 6.50, "soft-drinks", "AriZona Peach Ice Tea in a 1.5L bottle"),
    createProduct("Capri-Sun Multivitamin", 2.00, "soft-drinks", "Capri-Sun Multivitamin juice drink"),
    createProduct("Coca Cola 1.5l", 5.90, "soft-drinks", "Coca Cola in a 1.5L bottle"),
    createProduct("Coca Cola Zero", 2.50, "soft-drinks", "Coca Cola Zero"),
    createProduct("Coca-Cola Classic", 2.50, "soft-drinks", "Coca-Cola Classic"),
    createProduct("Fanta 1.5l", 5.90, "soft-drinks", "Fanta in a 1.5L bottle"),
    createProduct("Red Bull Original", 3.50, "energy-drinks", "Red Bull Original energy drink"),
    createProduct("Red Bull Sugarfree", 3.50, "energy-drinks", "Red Bull Sugarfree energy drink"),
    createProduct("San Bedetto Ice Tea Lemon", 2.50, "soft-drinks", "San Benedetto Lemon Ice Tea"),
    createProduct("San Benedetto Ice Tea Pfirsich", 2.50, "soft-drinks", "San Benedetto Peach Ice Tea"),
    createProduct("Sinalco Original", 2.50, "soft-drinks", "Sinalco Original soft drink"),
    createProduct("Uludag Original", 2.50, "soft-drinks", "Uludag Original soft drink")
  ];

  // Create the snacks products
  const snacks = [
    createProduct("Zweifel Nature Chips", 4.90, "chips", "Zweifel Nature flavored chips"),
    createProduct("Zweifel Paprika Chips", 4.90, "chips", "Zweifel Paprika flavored chips"),
    createProduct("Fonzies Original Käse Chips", 4.90, "chips", "Fonzies Original Cheese flavored chips"),
    createProduct("Granforno Grissini Traditionell", 5.90, "snacks", "Granforno Traditional Grissini breadsticks"),
    createProduct("Kinder Schokolade Stk.Preis", 0.70, "sweets", "Kinder Chocolate, price per piece"),
    createProduct("Kinder-Bueno (Einzeler Riegel)", 1.60, "sweets", "Kinder Bueno chocolate bar"),
    createProduct("Kinder-Milchschnitte", 1.20, "sweets", "Kinder Milk Slice"),
    createProduct("Nippon Hosta", 4.90, "snacks", "Nippon Hosta snack"),
    createProduct("Oreo Original", 4.90, "sweets", "Oreo Original cookies"),
    createProduct("Smoki Erdnuss Flips", 3.90, "snacks", "Smoki Peanut Flips"),
    createProduct("TUC Original LU gesalzen", 2.90, "snacks", "TUC Original LU salted crackers")
  ];

  // Create the non-food products
  const nonFood = [
    createProduct("Babywindel Gr.4 (8 Stk.)", 5.50, "hygiene", "Baby diapers, size 4, pack of 8"),
    createProduct("Kosmetiktücher-Box", 4.90, "hygiene", "Box of facial tissues"),
    createProduct("o.b. Procompfort mini", 3.90, "hygiene", "o.b. ProComfort mini tampons"),
    createProduct("Plastik Shotsbecher", 0.30, "disposables", "Plastic shot glasses"),
    createProduct("Plastikbecher", 0.30, "disposables", "Plastic cups"),
    createProduct("Taschentuch-Packung (2 Stk.)", 2.20, "hygiene", "Pack of tissues, 2 pieces"),
    createProduct("WC Papier (1 Rolle)", 2.40, "hygiene", "Toilet paper, 1 roll")
  ];

  // Create the smoking products (age-restricted)
  const tobacco = [
    createProduct("American Spirit Blue Tabak", 11.90, "tobacco", "American Spirit Blue tobacco", true),
    createProduct("Vogue Slim Blue", 12.90, "cigarettes", "Vogue Slim Blue cigarettes", true),
    createProduct("Sullana Drehtabak", 11.90, "tobacco", "Sullana rolling tobacco", true),
    createProduct("Parisienne Jaune", 12.90, "cigarettes", "Parisienne Jaune cigarettes", true),
    createProduct("Philip Morris Quantum Blue", 13.90, "cigarettes", "Philip Morris Quantum Blue cigarettes", true),
    createProduct("Marlboro Gold", 12.90, "cigarettes", "Marlboro Gold cigarettes", true),
    createProduct("Marlboro Rot", 12.90, "cigarettes", "Marlboro Red cigarettes", true),
    createProduct("Smoking Blue King Size", 2.50, "rolling-papers", "Smoking Blue King Size rolling papers", true)
  ];

  // Create the beer products (age-restricted)
  const beers = [
    createProduct("Feldschlösschen Original 0.33l", 2.50, "beer", "Original Feldschlösschen beer in a 0.33l bottle", true),
    createProduct("Feldschlösschen Original", 3.50, "beer", "Original Feldschlösschen beer", true),
    createProduct("Quöllfrisch 0.33l", 2.50, "beer", "Quöllfrisch beer in a 0.33l bottle", true),
    createProduct("Quöllfrisch 0.5l", 3.50, "beer", "Quöllfrisch beer in a 0.5l bottle", true),
    createProduct("Birra Ichnusa non Filtre", 3.90, "beer", "Unfiltered Birra Ichnusa beer", true),
    createProduct("Birra Morreti", 2.80, "beer", "Birra Morreti beer", true),
    createProduct("Desperados Original", 3.60, "beer", "Original Desperados beer", true),
    createProduct("Früh Kölsch 0.33l", 3.50, "beer", "Früh Kölsch beer in a 0.33l bottle", true),
    createProduct("Heineken Premium 0.33l", 2.50, "beer", "Heineken Premium beer in a 0.33l bottle", true),
    createProduct("Heineken Premium 0.5l", 3.60, "beer", "Heineken Premium beer in a 0.5l bottle", true),
    createProduct("Mönchshof Kellerbier 0.5l", 3.90, "beer", "Mönchshof Kellerbier in a 0.5l bottle", true),
    createProduct("Rothaus Tannenzäpfle 0.33l", 3.20, "beer", "Rothaus Tannenzäpfle beer in a 0.33l bottle", true)
  ];

  // Create the wine/sparkling wine products (age-restricted)
  const wines = [
    createProduct("Bluesecco Blu Rosé Rubicone IGT", 4.20, "wine", "Bluesecco Blu Rosé sparkling wine from the Rubicone region, Italy", true),
    createProduct("Bluesecco Blu Trevenezie IGT", 4.20, "wine", "Bluesecco Blu sparkling wine from the Trevenezie region, Italy", true)
  ];

  // Create the spirits products (age-restricted)
  const spirits = [
    createProduct("Ballantine's Finest Scotch", 34.00, "whiskey", "Ballantine's Finest Scotch Whisky", true),
    createProduct("Jack Daniel's Tennessee Whiskey", 49.00, "whiskey", "Jack Daniel's Tennessee Whiskey", true),
    createProduct("Jägermeister 70cl", 39.00, "liqueur", "Jägermeister herbal liqueur, 70cl bottle", true),
    createProduct("Johnnie Walker Red Label 70cl", 39.00, "whiskey", "Johnnie Walker Red Label Scotch Whisky, 70cl bottle", true),
    createProduct("Vodka Absolut 70cl", 46.00, "vodka", "Absolut Vodka, 70cl bottle", true),
    createProduct("Wodka Gorbatschow 70cl", 26.00, "vodka", "Wodka Gorbatschow, 70cl bottle", true)
  ];

  // Combine all products
  const allProducts = [
    ...softDrinks,
    ...snacks,
    ...nonFood,
    ...tobacco,
    ...beers,
    ...wines,
    ...spirits
  ];

  // Store in localStorage
  localStorage.setItem('adminProducts', JSON.stringify(allProducts));
  console.log(`🔄 Successfully seeded ${allProducts.length} products`);
  
  // Dispatch storage event to notify other components
  window.dispatchEvent(new Event('storage'));
  
  return;
};
