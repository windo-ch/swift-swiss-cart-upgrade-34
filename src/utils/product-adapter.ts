import { Product as SupabaseProduct } from '@/types/supabase';
import { Product as AppProduct } from '@/types/product';
import { getImageUrl } from '@/services/productService';
import { Tables } from '@/integrations/supabase/types';

type DbProduct = Tables<"products">;

/**
 * Convert a Supabase product to the app product format
 */
export const supabaseProductToAppProduct = (product: DbProduct): AppProduct => {
  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    image: getImageUrl(product.image || ''),
    category: product.category,
    ageRestricted: product.agerestricted || false,
    stock: product.stock || 0,
    isNew: false,
    ingredients: product.ingredients || '',
    weight: product.weight || ''
  };
};

/**
 * Convert an array of Supabase products to app product format
 */
export const supabaseProductsToAppProducts = (products: DbProduct[]): AppProduct[] => {
  return products.map(supabaseProductToAppProduct);
};

/**
 * Convert an app product to Supabase product format
 */
export const appProductToSupabaseProduct = (product: AppProduct): Partial<DbProduct> => {
  return {
    id: typeof product.id === 'number' ? product.id.toString() : product.id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    image: product.image,
    category: product.category,
    agerestricted: product.ageRestricted || false,
    stock: product.stock || 0,
    ingredients: product.ingredients || null,
    weight: product.weight || null
  };
}; 
