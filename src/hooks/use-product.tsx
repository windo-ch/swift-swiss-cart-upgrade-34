
import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getStoredProducts } from '../utils/product-utils';

export const useProduct = (productId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);
  
  const product = products.find(p => p.id.toString() === productId);
  
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id.toString() !== productId)
    .slice(0, 4);
    
  return {
    product,
    relatedProducts,
    isLoading: products.length === 0
  };
};
