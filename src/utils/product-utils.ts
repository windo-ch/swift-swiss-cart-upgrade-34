import { Product } from '../types/product';
import { supabase } from "@/integrations/supabase/client";
import { supabaseProductsToAppProducts } from './product-adapter';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://zbvdlkfnpufqfhrptfhz.supabase.co";
const DEFAULT_BUCKET = 'product-images';
const PLACEHOLDER_IMAGE = `${SUPABASE_URL}/storage/v1/object/public/product-images/gobrings-product-placeholder.png`;

/**
 * Get product image URL with proper formatting
 */
export const getProductImageUrl = (imageName: string): string => {
  if (!imageName) {
    return PLACEHOLDER_IMAGE;
  }
  
  // If it's already a full URL with the correct Supabase domain, return it as is
  if (imageName.includes(SUPABASE_URL)) {
    return imageName;
  }
  
  // If it's a full URL but not from Supabase, return the placeholder
  if (imageName.startsWith('http')) {
    console.log(`Non-Supabase URL detected: ${imageName}, using placeholder`);
    return PLACEHOLDER_IMAGE;
  }
  
  // Remove any leading slashes to avoid double slashes in URL
  const cleanImageName = imageName.replace(/^\/+/, '');
  
  // Construct Supabase storage URL with proper format
  return `${SUPABASE_URL}/storage/v1/object/public/${DEFAULT_BUCKET}/${cleanImageName}`;
};

/**
 * Get products directly from Supabase
 */
export const getStoredProducts = async (): Promise<Product[]> => {
  console.log("🔍 Getting products from Supabase...");
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) {
      console.error("❌ Error fetching products from Supabase:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log("⚠️ No products found in Supabase");
      return [];
    }
    
    console.log(`🛒 Successfully loaded ${data.length} products from Supabase`);
    
    // Convert to application format
    return supabaseProductsToAppProducts(data);
  } catch (error) {
    console.error('❌ Error loading products from Supabase:', error);
    return [];
  }
};
