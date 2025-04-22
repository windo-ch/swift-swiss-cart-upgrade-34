
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { useToast } from '@/components/ui/use-toast';

export const useProductMutations = (setProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  const { toast } = useToast();

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      console.log("Adding product:", productData);
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

      if (error) {
        console.error("Supabase error adding product:", error);
        throw error;
      }

      if (data) {
        console.log("Product added successfully:", data);
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
        
        return newProduct;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Fehler",
        description: "Produkt konnte nicht hinzugefügt werden.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      console.log("Updating product:", updatedProduct);
      const dbProduct = {
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

      if (error) {
        console.error("Supabase error updating product:", error);
        throw error;
      }

      console.log("Product updated successfully");
      setProducts(prev => prev.map(product => 
        String(product.id) === String(updatedProduct.id) ? updatedProduct : product
      ));

      toast({
        title: "Produkt aktualisiert",
        description: `${updatedProduct.name} wurde erfolgreich aktualisiert.`,
      });
      
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Fehler",
        description: "Produkt konnte nicht aktualisiert werden.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      console.log("Deleting product with ID:", id);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Supabase error deleting product:", error);
        throw error;
      }

      console.log("Product deleted successfully");
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
      throw error;
    }
  };

  return {
    addProduct,
    updateProduct,
    deleteProduct
  };
};
