
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { useToast } from '@/components/ui/use-toast';

export const useProductMutations = (setProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  const { toast } = useToast();

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const dbProduct = {
        name: productData.name,
        price: productData.price,
        category: productData.category,
        description: productData.description,
        image: productData.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
        ingredients: productData.ingredients,
        weight: productData.weight,
        stock: productData.stock,
        agerestricted: productData.ageRestricted,
      };

      const { data, error } = await supabase
        .from('products')
        .insert([dbProduct])
        .select()
        .single();

      if (error) throw error;

      if (data) {
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
      const dbProduct = {
        id: String(updatedProduct.id),
        name: updatedProduct.name,
        price: updatedProduct.price,
        category: updatedProduct.category,
        description: updatedProduct.description,
        image: updatedProduct.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
        ingredients: updatedProduct.ingredients,
        weight: updatedProduct.weight,
        stock: updatedProduct.stock,
        agerestricted: updatedProduct.ageRestricted,
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

  return {
    addProduct,
    updateProduct,
    deleteProduct
  };
};
