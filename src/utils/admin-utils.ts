
import { Product } from '../types/product';
import { products as storeProducts } from '../data/products';
import { getProductImageUrl } from './product-utils';

export const initializeAdminProducts = (): void => {
  // Clear any existing products to ensure a fresh start
  localStorage.removeItem('adminProducts');
  
  // Convert all store products to admin format with stock
  const formattedStoreProducts = storeProducts.map(product => ({
    ...product,
    id: product.id.toString(), // Ensure id is always a string
    description: product.description || '',
    weight: product.weight || '',
    ingredients: product.ingredients || '',
    image: getProductImageUrl(product.image),
    ageRestricted: product.ageRestricted || false,
    stock: 50 // Default stock value
  }));

  // Store all products as admin products
  localStorage.setItem('adminProducts', JSON.stringify(formattedStoreProducts));
  console.log("Initialized admin products from store:", formattedStoreProducts.length);
  
  // Dispatch storage event to notify other components of the update
  window.dispatchEvent(new Event('storage'));
};

// Utility function to debug the admin products
export const logAdminProducts = (): void => {
  const storedProducts = localStorage.getItem('adminProducts');
  if (storedProducts) {
    const products = JSON.parse(storedProducts);
    console.log("Current admin products:", products.length, products);
  } else {
    console.log("No admin products found in localStorage");
  }
};
