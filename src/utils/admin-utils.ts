
import { Product } from '../types/product';
import { products as storeProducts } from '../data/products';
import { getProductImageUrl } from './product-utils';

// Create a more reliable method to initialize admin products
export const initializeAdminProducts = (): void => {
  console.log("🔧 Initializing admin products");
  
  try {
    // Clear any existing products to ensure a fresh start
    localStorage.removeItem('adminProducts');
    
    // Convert all store products to admin format with stock
    const formattedStoreProducts = storeProducts.map(product => ({
      ...product,
      id: product.id.toString(), // Ensure id is always a string
      name: product.name,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price.toString()),
      category: product.category,
      description: product.description || '',
      weight: product.weight || '',
      ingredients: product.ingredients || '',
      image: getProductImageUrl(product.image),
      ageRestricted: product.ageRestricted || false,
      stock: 50 // Default stock value
    }));
    
    console.log(`📦 Source data contains ${storeProducts.length} products`);
    console.log(`🔄 Converted ${formattedStoreProducts.length} products to admin format`);
    
    // Store all products as admin products
    localStorage.setItem('adminProducts', JSON.stringify(formattedStoreProducts));
    
    // Dispatch storage event to notify other components of the update
    window.dispatchEvent(new Event('storage'));
    
    console.log("✅ Successfully initialized admin products");
  } catch (error) {
    console.error("❌ Error initializing admin products:", error);
    throw error;
  }
};

// Utility function to debug the admin products
export const logAdminProducts = (): void => {
  try {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      console.log(`🛒 Found ${products.length} admin products in localStorage`);
      
      // Log first few products to diagnose issues
      if (products.length > 0) {
        console.log(`📋 Sample products:`, products.slice(0, 3));
      }
    } else {
      console.log("❓ No admin products found in localStorage");
    }
  } catch (error) {
    console.error("❌ Error logging admin products:", error);
  }
};

// Add a utility function to clear admin products (for troubleshooting)
export const clearAdminProducts = (): void => {
  try {
    localStorage.removeItem('adminProducts');
    console.log("🗑️ Cleared admin products from localStorage");
    
    // Dispatch storage event to notify other components of the update
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error("❌ Error clearing admin products:", error);
  }
};
