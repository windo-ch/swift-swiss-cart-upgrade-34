
import { Product } from '../types/product';
import { products as storeProducts } from '../data/products/index';

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
  
  // Construct Supabase storage URL with proper format, avoiding double slashes
  return `${SUPABASE_URL}/storage/v1/object/public/${DEFAULT_BUCKET}/${imageName.replace(/^\/+/, '')}`;
};

export const getStoredProducts = (): Product[] => {
  console.log("Getting stored products...");
  try {
    // Get admin products from localStorage
    const storedProducts = localStorage.getItem('adminProducts');
    const adminProducts = storedProducts ? JSON.parse(storedProducts) : [];
    console.log("Admin products from localStorage:", adminProducts.length);
    
    // Ensure each store product has an ID as a string
    const formattedStoreProducts = storeProducts.map(product => ({
      ...product,
      id: product.id.toString(), // Ensure id is always a string
      description: product.description || '', // Ensure description has a default
      weight: product.weight || '', // Ensure weight has a default
      ingredients: product.ingredients || '', // Ensure ingredients has a default
      image: getProductImageUrl(product.image), // Properly format image URLs
      ageRestricted: product.ageRestricted || false // Ensure ageRestricted has a default
    }));
    
    console.log("Formatted store products:", formattedStoreProducts.length);
    
    // Combine all products - use a unique ID prefix to prevent collisions
    const allProducts = [...formattedStoreProducts, ...adminProducts];
    
    console.log(`Loaded ${allProducts.length} total products (${formattedStoreProducts.length} from store, ${adminProducts.length} from admin)`);
    return allProducts;
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return [];
  }
};
