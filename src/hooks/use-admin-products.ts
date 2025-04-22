
import { useState } from 'react';
import { Product } from '@/types/product';
import { useProductMutations } from './use-product-mutations';
import { useProductQueries } from './use-product-queries';

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addProduct, updateProduct, deleteProduct } = useProductMutations(setProducts);
  const { fetchProducts, updateStock } = useProductQueries(setProducts, setIsLoading);

  return {
    products,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    refreshProducts: fetchProducts,
    isLoading
  };
};
