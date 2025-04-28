import { seedProductsData } from './seed-products';
import { supabase } from '@/integrations/supabase/client';
import { Product as AppProduct } from '@/types/product';
import { ProductInsert } from '@/types/supabase';

// Constants
const PRODUCTS_TABLE = 'products';

// Default product data to use when localStorage isn't available (like in production)
const getDefaultSeedProducts = (): AppProduct[] => {
  // Basic seed data for when localStorage isn't available (like in Lovable or other hosting)
  let idCounter = 1000;
  
  return [
    // Soft drinks
    { id: idCounter++, name: "Coca-Cola Classic", price: 2.50, category: "soft-drinks", description: "Coca-Cola Classic", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    { id: idCounter++, name: "Coca Cola Zero", price: 2.50, category: "soft-drinks", description: "Coca Cola Zero", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    { id: idCounter++, name: "Fanta 1.5l", price: 5.90, category: "soft-drinks", description: "Fanta in a 1.5L bottle", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    
    // Snacks
    { id: idCounter++, name: "Zweifel Paprika Chips", price: 4.90, category: "chips-snacks", description: "Zweifel Paprika flavored chips", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    { id: idCounter++, name: "Oreo Original", price: 4.90, category: "sweets", description: "Oreo Original cookies", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    
    // Beer (age-restricted)
    { id: idCounter++, name: "Heineken Premium 0.5l", price: 3.60, category: "beer", description: "Heineken Premium beer in a 0.5l bottle", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: true, stock: 50 },
    { id: idCounter++, name: "Feldschlösschen Original", price: 3.50, category: "beer", description: "Original Feldschlösschen beer", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: true, stock: 50 }
  ];
};

/**
 * Get all products from the seed data
 */
export const getSeedProducts = (): AppProduct[] => {
  try {
    // Check if we're in a browser environment with localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      // First check if admin products exist in localStorage
      const storedProducts = localStorage.getItem('adminProducts');
      
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        if (Array.isArray(products) && products.length > 0) {
          return products;
        }
      }
      
      // If no products found, seed the localStorage (this will store and return products)
      seedProductsData();
      
      // Get the newly seeded products
      const newStoredProducts = localStorage.getItem('adminProducts');
      if (newStoredProducts) {
        return JSON.parse(newStoredProducts);
      }
    }
    
    // Fallback to hardcoded seed data if localStorage is not available
    // This is important for server-side environments like Lovable build
    console.log('Using fallback seed products data');
    return getDefaultSeedProducts();
  } catch (error) {
    console.error('Error in getSeedProducts:', error);
    // Return fallback seed data in case of any error
    return getDefaultSeedProducts();
  }
};

/**
 * Convert an app product to a Supabase product format
 */
export const convertToSupabaseProduct = (product: AppProduct): ProductInsert => {
  return {
    product_id: product.id.toString(),
    name: product.name,
    description: product.description || '',
    price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
    image: product.image || '',
    category: product.category,
    subcategory: '',
    agerestricted: product.ageRestricted || false,
    stock: product.stock || 100,
  };
};

/**
 * Initialize the products in Supabase if they don't exist
 */
export const initializeSupabaseProducts = async (): Promise<boolean> => {
  try {
    // Check if products already exist in Supabase
    const { count, error: countError } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking products count:', countError);
      return false;
    }
    
    // If products already exist, don't initialize
    if (count && count > 0) {
      console.log(`🛒 Found ${count} products in Supabase`);
      return true;
    }
    
    // Get seed products
    const seedProducts = getSeedProducts();
    
    if (seedProducts.length === 0) {
      console.error('❌ No seed products found');
      return false;
    }
    
    console.log(`🌱 Migrating ${seedProducts.length} products to Supabase...`);
    
    // Convert to Supabase format and insert in batches
    const supabaseProducts = seedProducts.map(convertToSupabaseProduct);
    
    // Insert products in batches of 10 to avoid timeout/payload size issues
    const batchSize = 10;
    for (let i = 0; i < supabaseProducts.length; i += batchSize) {
      const batch = supabaseProducts.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from(PRODUCTS_TABLE)
        .insert(batch);
      
      if (insertError) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
        return false;
      }
      
      console.log(`✅ Inserted batch ${i / batchSize + 1} of ${Math.ceil(supabaseProducts.length / batchSize)}`);
    }
    
    console.log(`✅ Successfully migrated ${supabaseProducts.length} products to Supabase`);
    return true;
  } catch (error) {
    console.error('Error in initializeSupabaseProducts:', error);
    return false;
  }
}; 
