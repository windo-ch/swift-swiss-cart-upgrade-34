
// Product data
export interface Product {
  id: number | string;
  name: string;
  image: string;
  price: number;
  category: string;
  ageRestricted: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  ingredients?: string;
  weight?: string;
  description?: string;
}

// Products array with updated type
export const products: Product[] = [
  {
    id: 1,
    name: 'Zweifel Chips Paprika',
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-paprika-155g-550_600x.jpg',
    price: 5.90,
    category: 'chips',
    ageRestricted: false,
    isNew: false,
    isFeatured: true,
    ingredients: 'Kartoffeln, Sonnenblumenöl, Paprika-Gewürz, Salz.',
    weight: '155g',
    description: 'Knusprige Kartoffelchips mit Paprika-Geschmack.'
  },
  {
    id: 2,
    name: 'Coca Cola 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/coca-cola-classic-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 3,
    name: 'Rivella Rot 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/rivella-rot-500ml-787_600x.jpg',
    price: 2.80,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 4,
    name: 'Kägi Fret Mini',
    image: 'https://brings-delivery.ch/cdn/shop/products/kagi-fret-mini-165g-250_600x.jpg',
    price: 3.90,
    category: 'sweets',
    ageRestricted: false
  },
  {
    id: 5,
    name: 'Red Bull Energy Drink',
    image: 'https://brings-delivery.ch/cdn/shop/products/red-bull-energy-drink-250ml-787_600x.jpg',
    price: 3.50,
    category: 'energy',
    ageRestricted: false
  },
  {
    id: 6,
    name: 'Zweifel Chips Nature',
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-nature-155g-550_600x.jpg',
    price: 5.90,
    category: 'chips',
    ageRestricted: false
  },
  {
    id: 7,
    name: 'Feldschlösschen Bier',
    image: 'https://brings-delivery.ch/cdn/shop/products/feldschlosschen-original-500ml-787_600x.jpg',
    price: 3.90,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 8,
    name: 'Ovomaltine Schokolade',
    image: 'https://brings-delivery.ch/cdn/shop/products/cailler-milch-1_600x.jpg',
    price: 2.90,
    category: 'sweets',
    ageRestricted: false
  },
  {
    id: 9,
    name: 'Valser Prickelnd',
    image: 'https://brings-delivery.ch/cdn/shop/products/valser-classic-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 10,
    name: 'Valser Still',
    image: 'https://brings-delivery.ch/cdn/shop/products/valser-silence-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 11,
    name: 'Lauretana mit Kohlensäure',
    image: 'https://brings-delivery.ch/cdn/shop/products/lauretana-mineralwasser-mit-kohlensaure-1000ml-787_600x.jpg',
    price: 3.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 12,
    name: 'Lauretana ohne Kohlensäure',
    image: 'https://brings-delivery.ch/cdn/shop/products/lauretana-mineralwasser-ohne-kohlensaure-1000ml-787_600x.jpg',
    price: 3.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 13,
    name: 'AriZona Honey Ice Tea',
    image: 'https://brings-delivery.ch/cdn/shop/products/arizona-honey-500ml-787_600x.jpg',
    price: 3.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 14,
    name: 'AriZona Honey Ice Tea 1.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/arizona-honey-1500ml-787_600x.jpg',
    price: 6.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 15,
    name: 'AriZona Pfirsich Ice Tea 1.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/arizona-peach-1500ml-787_600x.jpg',
    price: 6.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 16,
    name: 'Capri-Sun Multivitamin',
    image: 'https://brings-delivery.ch/cdn/shop/products/capri-sun-multivitamin-330ml-787_600x.jpg',
    price: 2.00,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 17,
    name: 'Coca Cola 1.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/coca-cola-classic-1500ml-787_600x.jpg',
    price: 5.90,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 18,
    name: 'Coca Cola Zero',
    image: 'https://brings-delivery.ch/cdn/shop/products/coca-cola-zero-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 19,
    name: 'Fanta 1.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/fanta-orange-1500ml-787_600x.jpg',
    price: 5.90,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 20,
    name: 'Red Bull Sugarfree',
    image: 'https://brings-delivery.ch/cdn/shop/products/red-bull-sugarfree-250ml-787_600x.jpg',
    price: 3.50,
    category: 'energy',
    ageRestricted: false
  },
  {
    id: 21,
    name: 'San Benedetto Ice Tea Lemon',
    image: 'https://brings-delivery.ch/cdn/shop/products/san-benedetto-ice-tea-lemon-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 22,
    name: 'San Benedetto Ice Tea Pfirsich',
    image: 'https://brings-delivery.ch/cdn/shop/products/san-benedetto-ice-tea-peach-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 23,
    name: 'Sinalco Original',
    image: 'https://brings-delivery.ch/cdn/shop/products/sinalco-original-330ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 24,
    name: 'Uludag Original',
    image: 'https://brings-delivery.ch/cdn/shop/products/uludag-gazoz-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks',
    ageRestricted: false
  },
  {
    id: 25,
    name: 'Zweifel Nature Chips',
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-nature-155g-550_600x.jpg',
    price: 4.90,
    category: 'chips',
    ageRestricted: false
  },
  {
    id: 26,
    name: 'Zweifel Paprika Chips',
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-paprika-155g-550_600x.jpg',
    price: 4.90,
    category: 'chips',
    ageRestricted: false
  },
  {
    id: 27,
    name: 'Fonzies Original Käse Chips',
    image: 'https://brings-delivery.ch/cdn/shop/products/fonzies-cheese-100g-250_600x.jpg',
    price: 4.90,
    category: 'chips',
    ageRestricted: false
  },
  {
    id: 28,
    name: 'Granforno Grissini Traditionell',
    image: 'https://brings-delivery.ch/cdn/shop/products/grissini-275g-550_600x.jpg',
    price: 5.90,
    category: 'snacks',
    ageRestricted: false
  },
  {
    id: 29,
    name: 'Kinder Schokolade',
    image: 'https://brings-delivery.ch/cdn/shop/products/kinder-schokolade-1-riegel-1-stueck_600x.jpg',
    price: 0.70,
    category: 'sweets',
    ageRestricted: false
  },
  {
    id: 30,
    name: 'Kinder-Bueno',
    image: 'https://brings-delivery.ch/cdn/shop/products/kinder-bueno-1-riegel-44g-250_600x.jpg',
    price: 1.60,
    category: 'sweets',
    ageRestricted: false
  },
  {
    id: 31,
    name: 'Kinder-Milchschnitte',
    image: 'https://brings-delivery.ch/cdn/shop/products/kinder-milchschnitte-1-packung-28g-250_600x.jpg',
    price: 1.20,
    category: 'sweets',
    ageRestricted: false
  },
  {
    id: 32,
    name: 'Nippon Hosta',
    image: 'https://brings-delivery.ch/cdn/shop/products/nippon-hosta-90g-837_600x.jpg',
    price: 4.90,
    category: 'snacks',
    ageRestricted: false
  },
  {
    id: 33,
    name: 'Oreo Original',
    image: 'https://brings-delivery.ch/cdn/shop/products/oreo-original-154g-550_600x.jpg',
    price: 4.90,
    category: 'sweets',
    ageRestricted: false
  },
  {
    id: 34,
    name: 'Smoki Erdnuss Flips',
    image: 'https://brings-delivery.ch/cdn/shop/products/smoki-50g-250_600x.jpg',
    price: 3.90,
    category: 'snacks',
    ageRestricted: false
  },
  {
    id: 35,
    name: 'TUC Original LU gesalzen',
    image: 'https://brings-delivery.ch/cdn/shop/products/tuc-original-100g-550_600x.jpg',
    price: 2.90,
    category: 'snacks',
    ageRestricted: false
  },
  {
    id: 36,
    name: 'Babywindel Gr.4 (8 Stk.)',
    image: 'https://brings-delivery.ch/cdn/shop/products/babywindeln-groesse-4-8-stueck-550_600x.jpg',
    price: 5.50,
    category: 'non-food',
    ageRestricted: false
  },
  {
    id: 37,
    name: 'Kosmetiktücher-Box',
    image: 'https://brings-delivery.ch/cdn/shop/products/kosmetik-tuecher-550_600x.jpg',
    price: 4.90,
    category: 'non-food',
    ageRestricted: false
  },
  {
    id: 38,
    name: 'o.b. Procompfort mini',
    image: 'https://brings-delivery.ch/cdn/shop/products/ob-procomfort-mini-8-stueck-550_600x.jpg',
    price: 3.90,
    category: 'non-food',
    ageRestricted: false
  },
  {
    id: 39,
    name: 'Plastik Shotsbecher',
    image: 'https://brings-delivery.ch/cdn/shop/products/shot-becher-550_600x.jpg',
    price: 0.30,
    category: 'non-food',
    ageRestricted: false
  },
  {
    id: 40,
    name: 'Plastikbecher',
    image: 'https://brings-delivery.ch/cdn/shop/products/plastikbecher-550_600x.jpg',
    price: 0.30,
    category: 'non-food',
    ageRestricted: false
  },
  {
    id: 41,
    name: 'Taschentuch-Packung (2 Stk.)',
    image: 'https://brings-delivery.ch/cdn/shop/products/taschentuch-2er-pack-550_600x.jpg',
    price: 2.20,
    category: 'non-food',
    ageRestricted: false
  },
  {
    id: 42,
    name: 'WC Papier (1 Rolle)',
    image: 'https://brings-delivery.ch/cdn/shop/products/wc-papier-1-stueck-550_600x.jpg',
    price: 2.40,
    category: 'non-food',
    ageRestricted: false
  },
  {
    id: 43,
    name: 'American Spirit Blue Tabak',
    image: 'https://brings-delivery.ch/cdn/shop/products/american-spirit-blue-tobacco-30g-550_600x.jpg',
    price: 11.90,
    category: 'tobacco',
    ageRestricted: true
  },
  {
    id: 44,
    name: 'Vogue Slim Blue',
    image: 'https://brings-delivery.ch/cdn/shop/products/vogue-blue-550_600x.jpg',
    price: 12.90,
    category: 'tobacco',
    ageRestricted: true
  },
  {
    id: 45,
    name: 'Sullana Drehtabak',
    image: 'https://brings-delivery.ch/cdn/shop/products/sullana-tabak-30g-550_600x.jpg',
    price: 11.90,
    category: 'tobacco',
    ageRestricted: true
  },
  {
    id: 46,
    name: 'Parisienne Jaune',
    image: 'https://brings-delivery.ch/cdn/shop/products/parisienne-jaune-550_600x.jpg',
    price: 12.90,
    category: 'tobacco',
    ageRestricted: true
  },
  {
    id: 47,
    name: 'Philip Morris Quantum Blue',
    image: 'https://brings-delivery.ch/cdn/shop/products/philip-morris-quantum-blue-550_600x.jpg',
    price: 13.90,
    category: 'tobacco',
    ageRestricted: true
  },
  {
    id: 48,
    name: 'Marlboro Gold',
    image: 'https://brings-delivery.ch/cdn/shop/products/marlboro-gold-550_600x.jpg',
    price: 12.90,
    category: 'tobacco',
    ageRestricted: true
  },
  {
    id: 49,
    name: 'Marlboro Rot',
    image: 'https://brings-delivery.ch/cdn/shop/products/marlboro-red-550_600x.jpg',
    price: 12.90,
    category: 'tobacco',
    ageRestricted: true
  },
  {
    id: 50,
    name: 'Smoking Blue King Size',
    image: 'https://brings-delivery.ch/cdn/shop/products/smoking-blue-king-size-550_600x.jpg',
    price: 2.50,
    category: 'tobacco',
    ageRestricted: true
  },
  {
    id: 51,
    name: 'Feldschlösschen Original 0.33L',
    image: 'https://brings-delivery.ch/cdn/shop/products/feldschlosschen-original-330ml-787_600x.jpg',
    price: 2.50,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 52,
    name: 'Quöllfrisch 0.33L',
    image: 'https://brings-delivery.ch/cdn/shop/products/appenzeller-quollfrisch-330ml-787_600x.jpg',
    price: 2.50,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 53,
    name: 'Quöllfrisch 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/appenzeller-quollfrisch-500ml-787_600x.jpg',
    price: 3.50,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 54,
    name: 'Birra Ichnusa non Filtrata',
    image: 'https://brings-delivery.ch/cdn/shop/products/birra-ichnusa-non-filtrata-500ml-787_600x.jpg',
    price: 3.90,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 55,
    name: 'Birra Morreti',
    image: 'https://brings-delivery.ch/cdn/shop/products/birra-moretti-330ml-787_600x.jpg',
    price: 2.80,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 56,
    name: 'Desperados Original',
    image: 'https://brings-delivery.ch/cdn/shop/products/desperados-330ml-787_600x.jpg',
    price: 3.60,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 57,
    name: 'Früh Kölsch 0.33L',
    image: 'https://brings-delivery.ch/cdn/shop/products/fruh-kolsch-330ml-787_600x.jpg',
    price: 3.50,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 58,
    name: 'Heineken Premium 0.33L',
    image: 'https://brings-delivery.ch/cdn/shop/products/heineken-330ml-787_600x.jpg',
    price: 2.50,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 59,
    name: 'Heineken Premium 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/heineken-500ml-787_600x.jpg',
    price: 3.60,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 60,
    name: 'Mönchshof Kellerbier 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/monchshof-kellerbier-500ml-787_600x.jpg',
    price: 3.90,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 61,
    name: 'Rothaus Tannenzäpfle 0.33L',
    image: 'https://brings-delivery.ch/cdn/shop/products/rothaus-tannenzapfle-330ml-787_600x.jpg',
    price: 3.20,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 62,
    name: 'Bluesecco Blu Rosé Rubicone IGT',
    image: 'https://brings-delivery.ch/cdn/shop/products/bluesecco-blu-rose-200ml-787_600x.jpg',
    price: 4.20,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 63,
    name: 'Bluesecco Blu Trevenezie IGT',
    image: 'https://brings-delivery.ch/cdn/shop/products/bluesecco-blu-200ml-787_600x.jpg',
    price: 4.20,
    category: 'alcohol',
    ageRestricted: true
  },
  {
    id: 64,
    name: 'Ballantine\'s Finest Scotch',
    image: 'https://brings-delivery.ch/cdn/shop/products/ballantines-07l-550_600x.jpg',
    price: 34.00,
    category: 'spirits',
    ageRestricted: true
  },
  {
    id: 65,
    name: 'Jack Daniel\'s Tennessee Whiskey',
    image: 'https://brings-delivery.ch/cdn/shop/products/jack-daniels-07l-550_600x.jpg',
    price: 49.00,
    category: 'spirits',
    ageRestricted: true
  },
  {
    id: 66,
    name: 'Jägermeister 70cl',
    image: 'https://brings-delivery.ch/cdn/shop/products/jagermeister-07l-550_600x.jpg',
    price: 39.00,
    category: 'spirits',
    ageRestricted: true
  },
  {
    id: 67,
    name: 'Johnnie Walker Red Label 70cl',
    image: 'https://brings-delivery.ch/cdn/shop/products/johnnie-walker-red-label-07l-550_600x.jpg',
    price: 39.00,
    category: 'spirits',
    ageRestricted: true
  },
  {
    id: 68,
    name: 'Vodka Absolut 70cl',
    image: 'https://brings-delivery.ch/cdn/shop/products/absolut-vodka-07l-550_600x.jpg',
    price: 46.00,
    category: 'spirits',
    ageRestricted: true
  },
  {
    id: 69,
    name: 'Wodka Gorbatschow 70cl',
    image: 'https://brings-delivery.ch/cdn/shop/products/wodka-gorbatschow-07l-550_600x.jpg',
    price: 26.00,
    category: 'spirits',
    ageRestricted: true
  },
];

// Categories
export const categories = [
  { id: 'all', name: 'Alli Produkt', icon: '🛒' },
  { id: 'drinks', name: 'Getränk', icon: '🥤' },
  { id: 'energy', name: 'Energy Drinks', icon: '⚡' },
  { id: 'chips', name: 'Chips', icon: '🍿' },
  { id: 'snacks', name: 'Snacks', icon: '🥨' },
  { id: 'sweets', name: 'Süssigkeite', icon: '🍫' },
  { id: 'non-food', name: 'Non-Food', icon: '🧻' },
  { id: 'tobacco', name: 'Tabak', icon: '🚬' },
  { id: 'alcohol', name: 'Alkohol', icon: '🍺' },
  { id: 'spirits', name: 'Spirituose', icon: '����' },
];

// Local storage helper
export const getStoredProducts = () => {
  try {
    const storedProducts = localStorage.getItem('adminProducts');
    const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
    return [...products, ...parsedProducts];
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return products;
  }
};
