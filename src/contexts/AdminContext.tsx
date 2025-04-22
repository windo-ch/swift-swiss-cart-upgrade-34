
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product as ProductType } from '@/types/product';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  
  const refreshProducts = useCallback(async () => {
    console.log("AdminContext - Fetching products from Supabase");
    setIsLoading(true);
    
    try {
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (productsData) {
        console.log(`AdminContext - Fetched ${productsData.length} products`);
        setProducts(productsData.map(product => ({
          ...product,
          id: String(product.id),
          price: Number(product.price)
        })));
      }
    } catch (error) {
      console.error("AdminContext - Error fetching products:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Produkte.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setProducts(prev => [...prev, { ...data, id: String(data.id) }]);
        toast({
          title: "Produkt hinzugefügt",
          description: `${productData.name} wurde erfolgreich hinzugefügt.`,
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Fehler",
        description: "Produkt konnte nicht hinzugefügt werden.",
        variant: "destructive"
      });
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', updatedProduct.id);

      if (error) throw error;

      setProducts(prev => prev.map(product => 
        String(product.id) === String(updatedProduct.id) ? updatedProduct : product
      ));

      toast({
        title: "Produkt aktualisiert",
        description: `${updatedProduct.name} wurde erfolgreich aktualisiert.`,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Fehler",
        description: "Produkt konnte nicht aktualisiert werden.",
        variant: "destructive"
      });
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(product => String(product.id) !== id));
      
      toast({
        title: "Produkt gelöscht",
        description: "Produkt wurde erfolgreich gelöscht.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Fehler",
        description: "Produkt konnte nicht gelöscht werden.",
        variant: "destructive"
      });
    }
  };

  const updateStock = async (id: string, newStock: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(product =>
        String(product.id) === id ? { ...product, stock: newStock } : product
      ));
    } catch (error) {
      console.error("Error updating stock:", error);
      toast({
        title: "Fehler",
        description: "Lagerbestand konnte nicht aktualisiert werden.",
        variant: "destructive"
      });
    }
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
