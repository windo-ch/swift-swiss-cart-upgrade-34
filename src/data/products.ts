
// Re-export everything from the products folder
export { products } from './products/index';
export type { Product } from '../types/product';
export { categories } from './categories-data';
export { getStoredProducts, getProductImageUrl } from '../utils/product-utils';
