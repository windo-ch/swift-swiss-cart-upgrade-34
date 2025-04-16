
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
          id: product.id.toString(), // Ensure id is always a string
          name: product.name,
          price: typeof product.price === 'number' ? product.price : parseFloat(product.price.toString()),
          category: product.category,
          image: getProductImageUrl(product.image), // Properly format image URLs
          description: product.description || '',
          weight: product.weight || '',
          ingredients: product.ingredients || '',
          ageRestricted: product.ageRestricted || false,
          stock: product.stock !== undefined ? product.stock : 50
        }));
      }
    }
    
    // If no admin products, fall back to the store products
    console.log("📦 Source data contains", storeProducts.length, "products");
    console.log("⚠️ No admin products found, using store products");
    
    const formattedStoreProducts = storeProducts.map(product => ({
      ...product,
      id: product.id.toString(), // Ensure id is always a string
      name: product.name,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price.toString()),
      category: product.category,
      description: product.description || '', // Ensure description has a default
      weight: product.weight || '', // Ensure weight has a default
      ingredients: product.ingredients || '', // Ensure ingredients has a default
      image: getProductImageUrl(product.image), // Properly format image URLs
      ageRestricted: product.ageRestricted || false, // Ensure ageRestricted has a default
      stock: 50 // Default stock value
    }));
    
    console.log("🔄 Formatted", formattedStoreProducts.length, "store products");
    
    // Save to localStorage so admin can edit them
    if (formattedStoreProducts.length > 0) {
      localStorage.setItem('adminProducts', JSON.stringify(formattedStoreProducts));
      
      // Dispatch storage event to notify other components of the update
      window.dispatchEvent(new Event('storage'));
    }
    
    return formattedStoreProducts;
  } catch (error) {
    console.error('❌ Error loading products from localStorage:', error);
    // If there's an error, clear localStorage and return empty array
    localStorage.removeItem('adminProducts');
    return [];
  }
};
