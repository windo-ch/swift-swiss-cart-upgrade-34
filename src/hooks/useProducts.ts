import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, initializeProducts } from '@/services/productService';
import { Product } from '@/types/supabase';

export const useProducts = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize products if needed
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeProducts();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing products:', error);
      }
    };
    
    initialize();
  }, []);
  
  // Fetch products using React Query
  const { 
    data: products, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: isInitialized,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Filter products by category
  const getProductsByCategory = (category: string) => {
    if (!products) return [];
    return products.filter(product => product.category === category);
  };
  
  // Get a product by ID
  const getProductById = (productId: string) => {
    if (!products) return null;
    return products.find(product => product.product_id === productId) || null;
  };
  
  // Get categories
  const getCategories = () => {
    if (!products) return [];
    
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  };
  
  // Get featured products
  const getFeaturedProducts = () => {
    if (!products) return [];
    
    return products.filter(product => product.is_featured);
  };
  
  // Get age-restricted products
  const getAgeRestrictedProducts = () => {
    if (!products) return [];
    
    return products.filter(product => product.is_age_restricted);
  };
  
  return {
    products: products || [],
    isLoading,
    isError,
    error,
    refetch,
    getProductsByCategory,
    getProductById,
    getCategories,
    getFeaturedProducts,
    getAgeRestrictedProducts,
    isInitialized
  };
}; 