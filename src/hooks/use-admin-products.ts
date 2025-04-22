
import { useState, useCallback } from 'react';
import { Product } from '@/types/product';
import { useProductMutations } from './use-product-mutations';
import { useProductQueries } from './use-product-queries';

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addProduct, updateProduct, deleteProduct } = useProductMutations(setProducts);
  const { fetchProducts, updateStock, seedProductsToSupabase } = useProductQueries(setProducts, setIsLoading);

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
    isLoading
  };
};
