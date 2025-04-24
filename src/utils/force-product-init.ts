import { supabase } from '@/integrations/supabase/client';
import { seedProductsData } from './seed-products';
import { getSeedProducts } from './supabase-seed';
import { appProductToSupabaseProduct } from './product-adapter';
import { Tables } from '@/integrations/supabase/types';

const PRODUCTS_TABLE = 'products';

type ProductInsert = Required<Pick<Tables<"products">, "name" | "category" | "price">> & 
  Partial<Omit<Tables<"products">, "name" | "category" | "price">>;

/**
 * Force initialize products in Supabase, clearing existing ones if necessary
 * This function is designed to be run from a diagnostic page to fix product data issues
 */
export const forceInitializeProducts = async (): Promise<{
  success: boolean;
  message: string;
  productCount: number;
}> => {
  try {
    // 1. Check if the products table exists
    const { data: tableInfo, error: tableError } = await supabase
      .from(PRODUCTS_TABLE)
      .select('count(*)')
      .limit(1)
      .single();
    
    if (tableError && !tableError.message.includes('does not exist')) {
      return {
        success: false,
        message: `Error accessing products table: ${tableError.message}`,
        productCount: 0
      };
    }
    
    // 2. Clear existing products if the table exists
    if (!tableError) {
      const { error: deleteError } = await supabase
        .from(PRODUCTS_TABLE)
        .delete()
        .neq('id', 'none'); // Delete all rows
      
      if (deleteError) {
        return {
          success: false,
          message: `Error clearing existing products: ${deleteError.message}`,
          productCount: 0
        };
      }
      
      console.log('✅ Cleared existing products');
    }
    
    // 3. Get seed products
    const seedProducts = getSeedProducts();
    
    if (seedProducts.length === 0) {
      return {
        success: false,
        message: 'No seed products found to initialize',
        productCount: 0
      };
    }
    
    console.log(`🌱 Migrating ${seedProducts.length} products to Supabase...`);
    
    // 4. Convert to Supabase format and insert in batches
    const supabaseProducts: ProductInsert[] = seedProducts.map(product => {
      const converted = appProductToSupabaseProduct(product);
      // Ensure required fields are present
      return {
        name: product.name,
        category: product.category,
        price: product.price,
        ...converted
      };
    });
    
    // Insert products in batches of 10 to avoid timeout/payload size issues
    const batchSize = 10;
    let insertedCount = 0;
    
    for (let i = 0; i < supabaseProducts.length; i += batchSize) {
      const batch = supabaseProducts.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from(PRODUCTS_TABLE)
        .insert(batch);
      
      if (insertError) {
        return {
          success: false,
          message: `Error inserting batch ${i / batchSize + 1}: ${insertError.message}`,
          productCount: insertedCount
        };
      }
      
      insertedCount += batch.length;
      console.log(`✅ Inserted batch ${i / batchSize + 1} of ${Math.ceil(supabaseProducts.length / batchSize)}`);
    }
    
    return {
      success: true,
      message: `Successfully migrated ${insertedCount} products to Supabase`,
      productCount: insertedCount
    };
  } catch (error) {
    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
      productCount: 0
    };
  }
}; 