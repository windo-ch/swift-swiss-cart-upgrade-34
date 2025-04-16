
import { Product } from '../types/product';
import { products as storeProducts } from '../data/products/index';
import { seedProductsData } from './seed-products';

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
  return `${SUPABASE_URL}/storage/v1/object/public/${DEFAULT_BUCKET}/${imageName.replace(/^\/+/, '')}`;
};

export const getStoredProducts = (): Product[] => {
  console.log("🔍 Getting stored products...");
  try {
    // First try to get products from localStorage that might have been modified in admin panel
    const storedProducts = localStorage.getItem('adminProducts');
    
    if (storedProducts) {
      const adminProducts = JSON.parse(storedProducts);
      console.log(`🛒 Found ${adminProducts.length} admin products in localStorage`);
      
      // If we have admin products, use those
      if (adminProducts && adminProducts.length > 0) {
        console.log("✅ Using admin products as the source of truth");
        
        // Ensure all products have required fields and proper formatting
        return adminProducts.map((product: Product) => ({
          ...product,
          id: String(product.id), // Ensure id is always a string
          name: product.name,
          price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
          category: product.category,
          image: product.image, // Do not modify image URLs here as they should be correct already
          description: product.description || '',
          weight: product.weight || '',
          ingredients: product.ingredients || '',
          ageRestricted: product.ageRestricted || false,
          stock: product.stock !== undefined ? product.stock : 50
        }));
      }
    }
    
    // If no admin products found, seed the products
    console.log("⚠️ No admin products found, seeding new products");
    seedProductsData();
    
    // Try to get the newly seeded products
    const newStoredProducts = localStorage.getItem('adminProducts');
    if (newStoredProducts) {
      const newProducts = JSON.parse(newStoredProducts);
      return newProducts;
    }
    
    // Fallback to an empty array if still no products
    console.error("❌ Failed to load or seed products");
    return [];
  } catch (error) {
    console.error('❌ Error loading products from localStorage:', error);
    // If there's an error, clear localStorage and return empty array
    localStorage.removeItem('adminProducts');
    return [];
  }
};
