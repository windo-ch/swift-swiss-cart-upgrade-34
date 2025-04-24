
import { Product as SupabaseProduct } from '@/types/supabase';
import { Product as AppProduct } from '@/types/product';
import { getImageUrl } from '@/services/productService';

/**
 * Convert a Supabase product to the app product format
 */
export const supabaseProductToAppProduct = (product: SupabaseProduct): AppProduct => {
  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    image: getImageUrl(product.image || ''),
    category: product.category,
    ageRestricted: product.agerestricted || false,
    isFeatured: false,
    stock: product.stock || 0
  };
};

/**
 * Convert an array of Supabase products to app product format
 */
export const supabaseProductsToAppProducts = (products: SupabaseProduct[]): AppProduct[] => {
  return products.map(supabaseProductToAppProduct);
};

/**
 * Convert an app product to Supabase product format
 */
export const appProductToSupabaseProduct = (product: AppProduct): Partial<SupabaseProduct> => {
  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description || '',
    price: product.price,
    image: product.image,
    category: product.category,
    agerestricted: product.ageRestricted,
    stock: product.stock || 0
  };
}; 
