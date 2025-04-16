
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product as ProductType } from '@/types/product';
import { getStoredProducts } from '@/utils/product-utils';

// Define our context product type based on the global Product type
export type Product = ProductType;

interface AdminContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  
  // Load all products on mount
  useEffect(() => {
    console.log("AdminContext - Loading products from store");
    const allProducts = getStoredProducts();
    
    // Make sure all products have a stock value
    const productsWithStock = allProducts.map(product => ({
      ...product,
      stock: product.stock !== undefined ? product.stock : 50 // Default stock of 50 for existing products
    }));
    
    setProducts(productsWithStock);
    localStorage.setItem('adminProducts', JSON.stringify(productsWithStock));
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      console.log("AdminContext - Saving products to localStorage:", products.length);
      localStorage.setItem('adminProducts', JSON.stringify(products));
      window.dispatchEvent(new Event('storage'));
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    console.log("AdminContext - Adding new product:", productData.name);
    const newProduct: Product = {
      ...productData,
      id: `admin-${Date.now()}`,
      ageRestricted: productData.ageRestricted || false,
      stock: productData.stock !== undefined ? productData.stock : 50 // Default stock of 50
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    console.log("AdminContext - Updating product:", updatedProduct.id);
    setProducts(prev => 
      prev.map(product => 
        product.id.toString() === updatedProduct.id.toString() ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    console.log("AdminContext - Deleting product:", id);
    setProducts(prev => prev.filter(product => product.id.toString() !== id));
  };

  const updateStock = (id: string, newStock: number) => {
    console.log("AdminContext - Updating stock for product:", id, newStock);
    setProducts(prev => 
      prev.map(product => 
        product.id.toString() === id ? { ...product, stock: newStock } : product
      )
    );
  };

  return (
    <AdminContext.Provider value={{
      products,
      setProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      updateStock
    }}>
      {children}
    </AdminContext.Provider>
  );
};
