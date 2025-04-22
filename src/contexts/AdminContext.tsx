
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
        // Map database fields to our Product type
        const mappedProducts: Product[] = productsData.map(product => ({
          id: String(product.id),
          name: product.name,
          price: Number(product.price),
          category: product.category,
          description: product.description || '',
          image: product.image || '',
          ingredients: product.ingredients || '',
          weight: product.weight || '',
          stock: product.stock || 0,
          ageRestricted: product.agerestricted || false, // Map from DB 'agerestricted' to our 'ageRestricted'
        }));
        setProducts(mappedProducts);
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
      // Convert from our ageRestricted field to DB agerestricted field
      const dbProduct = {
        name: productData.name,
        price: productData.price,
        category: productData.category,
        description: productData.description,
        image: productData.image,
        ingredients: productData.ingredients,
        weight: productData.weight,
        stock: productData.stock,
        agerestricted: productData.ageRestricted, // Map to DB field name
      };

      const { data, error } = await supabase
        .from('products')
        .insert([dbProduct])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        // Map back to our Product type
        const newProduct: Product = {
          id: String(data.id),
          name: data.name,
          price: Number(data.price),
          category: data.category,
          description: data.description || '',
          image: data.image || '',
          ingredients: data.ingredients || '',
          weight: data.weight || '',
          stock: data.stock || 0,
          ageRestricted: data.agerestricted || false,
        };
        
        setProducts(prev => [...prev, newProduct]);
        
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
      // Convert from our ageRestricted field to DB agerestricted field
      // and ensure id is a string
      const dbProduct = {
        id: String(updatedProduct.id),
        name: updatedProduct.name,
        price: updatedProduct.price,
        category: updatedProduct.category,
        description: updatedProduct.description,
        image: updatedProduct.image,
        ingredients: updatedProduct.ingredients,
        weight: updatedProduct.weight,
        stock: updatedProduct.stock,
        agerestricted: updatedProduct.ageRestricted, // Map to DB field name
      };

      const { error } = await supabase
        .from('products')
        .update(dbProduct)
        .eq('id', String(updatedProduct.id));

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
