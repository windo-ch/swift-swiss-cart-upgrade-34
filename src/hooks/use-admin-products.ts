
import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/types/product';
import { useProductMutations } from './use-product-mutations';
import { useProductQueries } from './use-product-queries';

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const { addProduct, updateProduct, deleteProduct } = useProductMutations(setProducts);
  const { fetchProducts, updateStock, seedProductsToSupabase } = useProductQueries(setProducts, setIsLoading);

  // Only fetch products once when the hook mounts
  useEffect(() => {
    let isMounted = true;
    
    if (!isInitialized) {
      console.log("Initial products fetch in useAdminProducts");
      setIsLoading(true);
      
      fetchProducts()
        .then(() => {
          if (isMounted) {
            setIsInitialized(true);
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error("Error in initial products fetch:", error);
          if (isMounted) {
            setIsInitialized(true); // Still mark as initialized to prevent infinite retries
            setIsLoading(false);
          }
        });
    }
    
    return () => {
      isMounted = false;
    };
  }, [fetchProducts, isInitialized]);

  const refreshProducts = useCallback(async () => {
    console.log("refreshProducts called in useAdminProducts");
    setIsLoading(true);
    try {
      const result = await fetchProducts();
      setIsLoading(false);
      return result;
    } catch (error) {
      console.error("Error in refreshProducts:", error);
      setIsLoading(false);
      throw error;
    }
  }, [fetchProducts]);

  const seedProducts = useCallback(async () => {
    console.log("seedProducts called in useAdminProducts");
    setIsLoading(true);
    try {
      const result = await seedProductsToSupabase();
      setIsLoading(false);
      return result;
    } catch (error) {
      console.error("Error in seedProducts:", error);
      setIsLoading(false);
      throw error;
    }
  }, [seedProductsToSupabase]);

  return {
    products,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    refreshProducts,
    seedProducts,
    isLoading,
    isInitialized
  };
};
