import { Product as SupabaseProduct } from '@/types/supabase';
import { Product } from '@/types/product';
import { getImageUrl } from '@/services/productService';
import { Tables } from '@/integrations/supabase/types';

type DbProduct = Tables<"products">;

/**
 * Convert a Supabase product to the app product format
 */
export const supabaseProductToAppProduct = (product: DbProduct): Product => {
  // Log the product structure to help with debugging
  console.log('Converting Supabase product to app format:', product);
  
  // The field names in the actual Supabase schema are different from what we expected
  // agerestricted instead of is_age_restricted
  // stock instead of inventory_count
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
 * Converts products from Supabase format to the application's format
 * @param supabaseProducts - Array of products from Supabase
 * @returns Array of products in the application's format
 */
export function supabaseProductsToAppProducts(supabaseProducts: any[]): Product[] {
  if (!Array.isArray(supabaseProducts)) {
    console.warn('supabaseProductsToAppProducts: Input is not an array', supabaseProducts);
    return [];
  }

  return supabaseProducts.map(product => ({
    id: product.id?.toString() || '',
    name: product.name || '',
    price: typeof product.price === 'number' ? product.price : 0,
    category: product.category || '',
    description: product.description || '',
    image: product.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
    ageRestricted: product.agerestricted || false,
    stock: typeof product.stock === 'number' ? product.stock : 50,
    weight: product.weight || '',
    ingredients: product.ingredients || '',
    isFeatured: product.isfeatured || false
  }));
}

/**
 * Converts a product from application format to Supabase format
 * @param appProduct - Product in application format
 * @returns Product in Supabase format
 */
export function appProductToSupabaseProduct(appProduct: Product): any {
  return {
    id: appProduct.id,
    name: appProduct.name,
    price: appProduct.price,
    category: appProduct.category,
    description: appProduct.description,
    image: appProduct.image,
    agerestricted: appProduct.ageRestricted,
    stock: appProduct.stock,
    weight: appProduct.weight,
    ingredients: appProduct.ingredients,
    isfeatured: appProduct.isFeatured
  };
} 
