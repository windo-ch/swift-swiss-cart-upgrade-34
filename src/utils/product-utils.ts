
import { Product } from '../types/product';
import { products as storeProducts } from '../data/products-data';

export const getStoredProducts = (): Product[] => {
  try {
    const storedProducts = localStorage.getItem('adminProducts');
    const adminProducts = storedProducts ? JSON.parse(storedProducts) : [];
    
    // Convert store products to match admin product format
    const formattedStoreProducts = storeProducts.map(product => ({
      ...product,
      id: product.id.toString(),
      image: product.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png'
    }));
    
    // Combine and deduplicate products based on ID
    const allProducts = [...formattedStoreProducts];
    
    // Add or update with admin products
    adminProducts.forEach(adminProduct => {
      const existingIndex = allProducts.findIndex(p => p.id === adminProduct.id);
      if (existingIndex >= 0) {
        allProducts[existingIndex] = adminProduct;
      } else {
        allProducts.push(adminProduct);
      }
    });
    
    console.log(`Loaded ${allProducts.length} total products (${storeProducts.length} from store, ${adminProducts.length} from admin)`);
    return allProducts;
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return [];
  }
};

// Helper to add a URL prefix to image paths if needed
export const getProductImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
  }
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Handle relative paths (for future uploads)
  return imagePath;
};
