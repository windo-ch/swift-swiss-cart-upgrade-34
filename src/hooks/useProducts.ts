import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, initializeProducts } from '@/services/productService';
import { Product } from '@/types/supabase';
import { forceInitializeProducts } from '@/utils/force-product-init'; // Import the force init function

export const useProducts = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0); // Track init attempts
  
  // Initialize products if needed
  useEffect(() => {
    const initialize = async () => {
      try {
        console.log('Initializing products...');
        await initializeProducts();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing products:', error);
        setIsInitialized(false);
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
  
  // If products are empty or there's an error, try to force initialize them
  useEffect(() => {
    const forceInit = async () => {
      // Only attempt to reinitialize if we have no products and haven't attempted more than once
      if (((!products || products.length === 0) || isError) && initAttempts < 1) {
        console.log('No products found or error occurred. Attempting to force initialize products...');
        try {
          setInitAttempts(prev => prev + 1);
          const result = await forceInitializeProducts();
          console.log('Force initialization result:', result);
          
          if (result.success) {
            console.log('Successfully force initialized products. Refetching...');
            setIsInitialized(true); // Ensure this is set to true
            await refetch(); // Refetch products
          }
        } catch (error) {
          console.error('Error during force initialization:', error);
        }
      }
    };
    
    // Only run if products have been fetched once (success or failure)
    if (!isLoading && isInitialized) {
      forceInit();
    }
  }, [products, isError, isLoading, initAttempts, refetch, isInitialized]);
  
  // Filter products by category
  const getProductsByCategory = (category: string) => {
    if (!products) return [];
    return products.filter(product => product.category === category);
  };
  
  // Get a product by ID
  const getProductById = (productId: string) => {
    if (!products) return null;
    // Use the product's id field for matching
    return products.find(product => product.id === productId) || null;
  };
  
  // Get categories
  const getCategories = () => {
    if (!products) return [];
    
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  };
  
  // Get featured products - in Supabase we don't yet have this field, so we'll return some products for now
  const getFeaturedProducts = () => {
    if (!products) return [];
    
    // We don't have a featured field in our schema yet - return first 5 products
    return products.slice(0, 5);
  };
  
  // Get age-restricted products
  const getAgeRestrictedProducts = () => {
    if (!products) return [];
    
    // Use the correct field name from the actual schema
    return products.filter(product => product.agerestricted);
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
