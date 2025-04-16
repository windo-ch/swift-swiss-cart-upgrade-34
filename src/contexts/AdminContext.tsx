
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define a strict product type
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  weight: string;
  ingredients?: string;
}

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
    localStorage.setItem('adminProducts', JSON.stringify(products));
    window.dispatchEvent(new Event('storage'));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
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
