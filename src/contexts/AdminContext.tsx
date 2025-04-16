
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product as ProductType } from '@/types/product';
import { getStoredProducts } from '@/utils/product-utils';
import { products as storeProducts } from '@/data/products';
import { logAdminProducts } from '@/utils/admin-utils';
import { useToast } from '@/components/ui/use-toast';

// Define our context product type based on the global Product type
export type Product = ProductType;

interface AdminContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  refreshProducts: () => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Function to load products from localStorage
  const refreshProducts = useCallback(() => {
    console.log("AdminContext - Refreshing products from localStorage");
    setIsLoading(true);
    
    try {
      logAdminProducts(); // Debug: log current admin products
      
      const allProducts = getStoredProducts();
      
      if (allProducts.length > 0) {
        console.log(`AdminContext - Found ${allProducts.length} products in storage`);
        
        // Make sure all products have required fields
        const productsWithRequiredFields = allProducts.map(product => ({
          ...product,
          id: String(product.id),
          name: product.name || 'Unnamed Product',
          price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price) || '0'),
          category: product.category || 'other',
          image: product.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
          description: product.description || '',
          weight: product.weight || '',
          ingredients: product.ingredients || '',
          ageRestricted: product.ageRestricted || false,
          stock: product.stock !== undefined ? product.stock : 50
        }));
        
        setProducts(productsWithRequiredFields);
      } else {
        console.log("AdminContext - No products in storage, initializing from store");
        
        // If no products are in storage, initialize with store products
        const initialProducts = storeProducts.map(product => ({
          ...product,
          id: String(product.id),
          name: product.name,
          price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
          category: product.category,
          image: product.image,
          description: product.description || '',
          weight: product.weight || '',
          ingredients: product.ingredients || '',
          ageRestricted: product.ageRestricted || false,
          stock: 50 // Default stock of 50
        }));
        
        setProducts(initialProducts);
        localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
        
        // Dispatch storage event
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error) {
      console.error("AdminContext - Error refreshing products:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Produkte.",
        duration: 3000,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  // Load all products on mount
  useEffect(() => {
    refreshProducts();
    
    // Listen for storage events to refresh products
    const handleStorageChange = () => {
      console.log("Storage event detected, refreshing products");
      refreshProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshProducts]);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0 && !isLoading) {
      console.log("AdminContext - Saving products to localStorage:", products.length);
      localStorage.setItem('adminProducts', JSON.stringify(products));
      // Don't dispatch storage event here to avoid infinite loops
    }
  }, [products, isLoading]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    console.log("AdminContext - Adding new product:", productData.name);
    const newProduct: Product = {
      ...productData,
      id: `admin-${Date.now()}`,
      ageRestricted: productData.ageRestricted || false,
      stock: productData.stock !== undefined ? productData.stock : 50 // Default stock of 50
    };
    setProducts(prev => [...prev, newProduct]);
    
    toast({
      title: "Produkt hinzugefügt",
      description: `${productData.name} wurde erfolgreich hinzugefügt.`,
      duration: 3000,
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    console.log("AdminContext - Updating product:", updatedProduct.id);
    setProducts(prev => 
      prev.map(product => 
        String(product.id) === String(updatedProduct.id) ? updatedProduct : product
      )
    );
    
    toast({
      title: "Produkt aktualisiert",
      description: `${updatedProduct.name} wurde erfolgreich aktualisiert.`,
      duration: 3000,
    });
  };

  const deleteProduct = (id: string) => {
    console.log("AdminContext - Deleting product:", id);
    // Find product name before deleting for toast message
    const productToDelete = products.find(p => String(p.id) === id);
    
    setProducts(prev => prev.filter(product => String(product.id) !== id));
    
    toast({
      title: "Produkt gelöscht",
      description: productToDelete 
        ? `${productToDelete.name} wurde erfolgreich gelöscht.`
        : "Produkt wurde erfolgreich gelöscht.",
      duration: 3000,
    });
  };

  const updateStock = (id: string, newStock: number) => {
    console.log("AdminContext - Updating stock for product:", id, newStock);
    setProducts(prev => 
      prev.map(product => 
        String(product.id) === id ? { ...product, stock: newStock } : product
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
      updateStock,
      refreshProducts,
      isLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
};
