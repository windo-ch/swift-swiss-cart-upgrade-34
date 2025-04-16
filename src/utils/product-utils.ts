
import { Product } from '../types/product';
import { products as storeProducts } from '../data/products/index';
import { supabase } from '../integrations/supabase/client';

const SUPABASE_URL = "https://zbvdlkfnpufqfhrptfhz.supabase.co";
const DEFAULT_BUCKET = 'product-images';

export const getProductImageUrl = (imageName: string): string => {
  if (!imageName) {
    return 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
  }
  
  // If it's already a full URL, return it
  if (imageName.startsWith('http')) {
    return imageName;
  }
  
  // Construct Supabase storage URL with proper format
  return `${SUPABASE_URL}/storage/v1/object/public/${DEFAULT_BUCKET}/${imageName}`;
};

export const getStoredProducts = (): Product[] => {
  try {
    const storedProducts = localStorage.getItem('adminProducts');
    const adminProducts = storedProducts ? JSON.parse(storedProducts) : [];
    
    // Convert store products to match admin product format
    const formattedStoreProducts = storeProducts.map(product => ({
      ...product,
      id: product.id.toString(), // Ensure id is always a string
      // Ensure all required fields have default values
      description: product.description || '',
      weight: product.weight || '',
      ingredients: product.ingredients || '',
      // Ensure image paths are properly formatted
      image: getProductImageUrl(product.image)
    }));
    
    // Combine and deduplicate products based on ID
    const allProducts = [...formattedStoreProducts];
    
    // Add or update with admin products
    adminProducts.forEach(adminProduct => {
      const existingIndex = allProducts.findIndex(p => p.id.toString() === adminProduct.id.toString());
      if (existingIndex >= 0) {
        allProducts[existingIndex] = {
          ...adminProduct,
          image: getProductImageUrl(adminProduct.image),
          description: adminProduct.description || '',
          weight: adminProduct.weight || '',
          ingredients: adminProduct.ingredients || ''
        };
      } else {
        allProducts.push({
          ...adminProduct,
          image: getProductImageUrl(adminProduct.image),
          description: adminProduct.description || '',
          weight: adminProduct.weight || '',
          ingredients: adminProduct.ingredients || ''
        });
      }
    });
    
    console.log(`Loaded ${allProducts.length} total products (${storeProducts.length} from store, ${adminProducts.length} from admin)`);
    return allProducts;
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return [];
  }
};
