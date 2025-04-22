
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
    if (!isInitialized) {
      console.log("Initial products fetch in useAdminProducts");
      fetchProducts()
        .then(() => {
          setIsInitialized(true);
        })
        .catch(error => {
          console.error("Error in initial products fetch:", error);
          setIsInitialized(true); // Still mark as initialized to prevent infinite retries
        });
    }
  }, [fetchProducts, isInitialized]);

  const refreshProducts = useCallback(async () => {
    console.log("refreshProducts called in useAdminProducts");
    try {
      return await fetchProducts();
    } catch (error) {
      console.error("Error in refreshProducts:", error);
      throw error;
    }
  }, [fetchProducts]);

  const seedProducts = useCallback(async () => {
    console.log("seedProducts called in useAdminProducts");
    try {
      return await seedProductsToSupabase();
    } catch (error) {
      console.error("Error in seedProducts:", error);
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
