
import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getStoredProducts } from '../utils/product-utils';

export const useProduct = (productId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log("useProduct hook: Loading products for product ID:", productId);
    try {
      const allProducts = getStoredProducts();
      console.log(`useProduct hook: Loaded ${allProducts.length} products`);
      setProducts(allProducts);
    } catch (error) {
      console.error("Error in useProduct hook:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const product = products.find(p => p.id.toString() === productId);
  
  console.log("useProduct hook: Found product:", product);
  
  // Don't modify the image URLs here, as we're now doing it in the ProductImage component
  const formattedProduct = product ? {
    ...product
  } : undefined;
  
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id.toString() !== productId)
    .slice(0, 4)
    .map(p => ({
      ...p
    }));
    
  return {
    product: formattedProduct,
    relatedProducts,
    isLoading: isLoading || products.length === 0
  };
};
