
import { Product } from '../types/product';
import { products as storeProducts } from '../data/products';
import { getProductImageUrl } from './product-utils';
import { seedProductsData } from './seed-products';

// Create a more reliable method to initialize admin products
export const initializeAdminProducts = (): void => {
  console.log("🔧 Initializing admin products");
  
  try {
    // Check if there are any admin products already
    const existingProducts = localStorage.getItem('adminProducts');
    
    if (existingProducts) {
      try {
        const parsedProducts = JSON.parse(existingProducts);
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          console.log(`📦 Found ${parsedProducts.length} existing admin products`);
          return; // Use existing products
        }
      } catch (e) {
        console.error("Failed to parse existing products, will reinitialize");
      }
    }
    
    // If we get here, we need to seed products
    console.log("📦 No valid admin products found, seeding with default products");
    seedProductsData();
  } catch (error) {
    console.error("❌ Error initializing admin products:", error);
    throw error;
  }
};

// Function to force reinitialize all products
export const forceReinitializeAdminProducts = (): void => {
  console.log("🔄 Force reinitializing admin products");
  
  try {
    // Clear existing products
    localStorage.removeItem('adminProducts');
    
    // Seed with default products
    seedProductsData();
    
    console.log("✅ Successfully reinitialized admin products");
  } catch (error) {
    console.error("❌ Error reinitializing admin products:", error);
    throw error;
  }
};

// Call forceReinitializeAdminProducts to update categories
setTimeout(() => {
  forceReinitializeAdminProducts();
  console.log("🔄 Products reinitialized with updated categories");
}, 1000);

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
