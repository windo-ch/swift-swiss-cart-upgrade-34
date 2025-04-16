// Product data
export const products = [
  {
    id: 1,
    name: 'Zweifel Chips Paprika',
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-paprika-155g-550_600x.jpg',
    price: 5.90,
    category: 'chips'
  },
  {
    id: 2,
    name: 'Coca Cola 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/coca-cola-classic-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks'
  },
  {
    id: 3,
    name: 'Rivella Rot 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/rivella-rot-500ml-787_600x.jpg',
    price: 2.80,
    category: 'drinks'
  },
  {
    id: 4,
    name: 'Kägi Fret Mini',
    image: 'https://brings-delivery.ch/cdn/shop/products/kagi-fret-mini-165g-250_600x.jpg',
    price: 3.90,
    category: 'sweets'
  },
  {
    id: 5,
    name: 'Red Bull Energy Drink',
    image: 'https://brings-delivery.ch/cdn/shop/products/red-bull-energy-drink-250ml-787_600x.jpg',
    price: 3.50,
    category: 'energy'
  },
  {
    id: 6,
    name: 'Zweifel Chips Nature',
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-nature-155g-550_600x.jpg',
    price: 5.90,
    category: 'chips'
  },
  {
    id: 7,
    name: 'Feldschlösschen Bier',
    image: 'https://brings-delivery.ch/cdn/shop/products/feldschlosschen-original-500ml-787_600x.jpg',
    price: 3.90,
    category: 'alcohol'
  },
  {
    id: 8,
    name: 'Ovomaltine Schokolade',
    image: 'https://brings-delivery.ch/cdn/shop/products/cailler-milch-1_600x.jpg',
    price: 2.90,
    category: 'sweets'
  },
];

// Categories
export const categories = [
  { id: 'all', name: 'Alli Produkt', icon: '🛒' },
  { id: 'chips', name: 'Chips & Snacks', icon: '🍿' },
  { id: 'drinks', name: 'Getränk', icon: '🥤' },
  { id: 'sweets', name: 'Süssigkeite', icon: '🍫' },
  { id: 'alcohol', name: 'Alkohol', icon: '🍺' },
  { id: 'energy', name: 'Energy Drinks', icon: '⚡' },
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
