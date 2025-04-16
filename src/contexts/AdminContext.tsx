
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product as ProductType } from '@/types/product';

// Define our context product type based on the global Product type
export type Product = Omit<ProductType, 'isNew' | 'isFeatured'> & {
  id: string;
  ageRestricted?: boolean;
};

interface AdminContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Get products from localStorage
const getStoredAdminProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem('adminProducts');
    console.log("AdminContext - Stored products from localStorage:", stored ? "Found" : "None");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading admin products:', error);
    return [];
  }
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(getStoredAdminProducts());

  // Save products to localStorage whenever they change
  useEffect(() => {
    console.log("AdminContext - Saving products to localStorage:", products.length);
    localStorage.setItem('adminProducts', JSON.stringify(products));
    window.dispatchEvent(new Event('storage'));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    console.log("AdminContext - Adding new product:", productData.name);
    const newProduct: Product = {
      ...productData,
      id: `admin-${Date.now()}`,
      ageRestricted: productData.ageRestricted || false, // Ensure ageRestricted has a default value
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    console.log("AdminContext - Updating product:", updatedProduct.id);
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    console.log("AdminContext - Deleting product:", id);
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      products,
      setProducts,
      addProduct,
      updateProduct,
      deleteProduct,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
