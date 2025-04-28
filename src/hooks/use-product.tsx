import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { useProducts } from './useProducts';
import { supabaseProductsToAppProducts } from '@/utils/product-adapter';
import { Tables } from '@/integrations/supabase/types';

export const useProduct = (productId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const { products: supabaseProducts, isLoading: productsLoading, isError } = useProducts();
  
  useEffect(() => {
    console.log(`useProduct hook: Product ID: "${productId}", Loading: ${productsLoading}, Error: ${isError}`);
    console.log(`useProduct hook: Loaded ${supabaseProducts?.length || 0} Supabase products`);
    
    if (productId) {
      const matchingProduct = supabaseProducts.find(p => p.id === productId);
      console.log(`useProduct hook: Found matching product for ID ${productId}:`, matchingProduct);
    }
    
    if (!productsLoading) {
      setIsLoading(false);
    }
  }, [productId, productsLoading, supabaseProducts, isError]);
  
  // Convert Supabase products to app product format
  // Use empty array as fallback if supabaseProducts is undefined
  const products = supabaseProductsToAppProducts(
    Array.isArray(supabaseProducts) ? supabaseProducts as Tables<"products">[] : []
  );
  
  // Find the product with exact string comparison
  const product = products.find(p => p.id.toString() === productId);
  
  // Get related products (same category, different product)
  const relatedProducts = product 
    ? products
        .filter(p => p.category === product.category && p.id.toString() !== productId)
        .slice(0, 4)
    : [];
    
  return {
    product,
    relatedProducts,
    isLoading: isLoading || productsLoading,
    isError
  };
};
