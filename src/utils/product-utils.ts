
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
      image: product.image || '',
      weight: '',
      ingredients: ''
    }));
    
    // Combine and deduplicate products based on ID
    const allProducts = [...formattedStoreProducts];
    adminProducts.forEach(adminProduct => {
      const existingIndex = allProducts.findIndex(p => p.id === adminProduct.id);
      if (existingIndex >= 0) {
        allProducts[existingIndex] = adminProduct;
      } else {
        allProducts.push(adminProduct);
      }
    });
    
    return allProducts;
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return [];
  }
};
