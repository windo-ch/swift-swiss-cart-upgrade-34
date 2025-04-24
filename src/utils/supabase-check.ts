import { supabase } from "@/integrations/supabase/client";
import type { ProductInsert } from "@/types/supabase";
import { Product as AppProduct } from '@/types/product';

// Function to check the structure of the products table
export const checkProductsTable = async () => {
  try {
    // First, just try to get the table structure
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    console.log('Products table check:', { data, error });
    
    // Get the actual column names
    if (error) {
      const message = error.message;
      // Extract column names from error message if possible
      if (message.includes('column') && message.includes('does not exist')) {
        console.error('Column mismatch detected!', message);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error checking products table:', error);
    return null;
  }
};

// Try to insert a test product with all fields
export const testProductInsert = async () => {
  const testProduct: ProductInsert = {
    product_id: 'test-' + Date.now(),
    name: 'Test Product',
    description: 'This is a test product',
    price: 9.99,
    image: '',
    category: 'test',
    subcategory: '',
    is_age_restricted: false,
    is_featured: false,
    inventory_count: 0
  };
  
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(testProduct)
      .select();
    
    console.log('Test insert result:', { data, error });
    return { data, error };
  } catch (error) {
    console.error('Error inserting test product:', error);
    return { data: null, error };
  }
};

// Convert AppProduct to the exact Supabase schema
export const convertAppProductToSupabase = (product: AppProduct): any => {
  return {
    product_id: product.id.toString(),
    name: product.name,
    description: product.description || '',
    price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
    image: product.image || '',
    category: product.category,
    // Add any fields that might be in the database but not in your type
    // Uncomment these if they're in your actual database
    // subcategory: '',
    // is_age_restricted: product.ageRestricted || false,
    // is_featured: false, 
    // inventory_count: product.stock || 100
  };
}; 