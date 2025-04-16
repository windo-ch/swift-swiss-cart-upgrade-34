
import { Product } from '../types/product';
import { products } from '../data/products-data';

export const getStoredProducts = (): Product[] => {
  try {
    const storedProducts = localStorage.getItem('adminProducts');
    const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
    return [...products, ...parsedProducts];
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return products;
  }
};
