import { seedProductsData } from './seed-products';
import { supabase } from '@/integrations/supabase/client';
import { Product as AppProduct } from '@/types/product';
import { ProductInsert } from '@/types/supabase';

// Constants
const PRODUCTS_TABLE = 'products';

/**
 * Get all products from the seed data
 */
export const getSeedProducts = (): AppProduct[] => {
  try {
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
    
    return [];
  } catch (error) {
    console.error('Error in getSeedProducts:', error);
    return [];
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
    is_age_restricted: product.ageRestricted || false,
    is_featured: product.isFeatured || false,
    inventory_count: product.stock || 100
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
    
    // Get seed products from localStorage
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