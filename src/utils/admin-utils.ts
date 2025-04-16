
import { Product } from '../types/product';
import { products as storeProducts } from '../data/products';
import { getProductImageUrl } from './product-utils';

export const initializeAdminProducts = (): void => {
  // Check if we already have admin products
  const existingProducts = localStorage.getItem('adminProducts');
  if (existingProducts && JSON.parse(existingProducts).length > 0) {
    console.log("Admin products already exist, not initializing sample data");
    return;
  }

  // Convert store products to admin format
  const formattedStoreProducts = storeProducts.map(product => ({
    ...product,
    id: `admin-store-${product.id}`, // Prefix with admin-store to distinguish them
    description: product.description || '',
    weight: product.weight || '',
    ingredients: product.ingredients || '',
    image: getProductImageUrl(product.image),
    ageRestricted: product.ageRestricted || false
  }));

  // Use the first 10 store products as admin products for a better starting point
  const initialAdminProducts = formattedStoreProducts.slice(0, 10);

  // Store the admin products
  localStorage.setItem('adminProducts', JSON.stringify(initialAdminProducts));
  console.log("Initialized admin products from store:", initialAdminProducts.length);
};
