import { supabase } from "@/integrations/supabase/client";
import { ProductInsert, ProductUpdate, Product } from "@/types/supabase";
import { initializeSupabaseProducts, getSeedProducts, convertToSupabaseProduct } from "@/utils/supabase-seed";

// Constants
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const DEFAULT_BUCKET = "product-images";
const PRODUCTS_TABLE = "products";

/**
 * Fetch all products from Supabase
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*')
      .eq('product_id', productId)
      .single();
    
    if (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error in fetchProductById:", error);
    throw error;
  }
};

/**
 * Create a new product in Supabase
 */
export const createProduct = async (product: ProductInsert): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .insert(product)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating product:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
};

/**
 * Update an existing product in Supabase
 */
export const updateProduct = async (productId: string, updates: ProductUpdate): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .update(updates)
      .eq('product_id', productId)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw error;
  }
};

/**
 * Delete a product from Supabase
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .delete()
      .eq('product_id', productId);
    
    if (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    throw error;
  }
};

/**
 * Get the Supabase storage URL for a product image
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return `${SUPABASE_URL}/storage/v1/object/public/${DEFAULT_BUCKET}/gobrings-product-placeholder.png`;
  }
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Extract just the filename if it includes a path
  const filename = imagePath.includes('/') 
    ? imagePath.split('/').pop() 
    : imagePath;
    
  return `${SUPABASE_URL}/storage/v1/object/public/${DEFAULT_BUCKET}/${filename}`;
};

/**
 * Initialize the products in Supabase if none exist
 */
export const initializeProducts = async (): Promise<void> => {
  try {
    // Initialize Supabase products from seed data
    const success = await initializeSupabaseProducts();
    
    if (!success) {
      console.warn("⚠️ Failed to initialize Supabase products, falling back to local seed data");
    } else {
      console.log("✅ Supabase products initialized successfully");
    }
  } catch (error) {
    console.error("Error in initializeProducts:", error);
    throw error;
  }
}; 