import { Product as SupabaseProduct } from '@/types/supabase';
import { Product as AppProduct } from '@/types/product';
import { getImageUrl } from '@/services/productService';

/**
 * Convert a Supabase product to the app product format
 */
export const supabaseProductToAppProduct = (product: SupabaseProduct): AppProduct => {
  return {
    id: product.product_id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    image: getImageUrl(product.image),
    category: product.category,
    ageRestricted: product.is_age_restricted,
    isFeatured: product.is_featured,
    stock: product.inventory_count
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
    product_id: product.id.toString(),
    name: product.name,
    description: product.description || '',
    price: product.price,
    image: product.image,
    category: product.category,
    is_age_restricted: product.ageRestricted,
    is_featured: product.isFeatured || false,
    inventory_count: product.stock || 0
  };
}; 