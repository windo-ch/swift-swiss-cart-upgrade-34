
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { useToast } from '@/components/ui/use-toast';

export const useProductQueries = (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>, 
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    console.log("Fetching products from Supabase");
    
    try {
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase error when fetching products:", error);
        throw error;
      }
      
      console.log("Products data response:", productsData);
      
      if (productsData && productsData.length > 0) {
        console.log(`Fetched ${productsData.length} products`);
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
          ageRestricted: product.agerestricted || false,
        }));
        setProducts(mappedProducts);
        return mappedProducts;
      } else {
        console.log("No products found in Supabase, showing seed products option");
        setProducts([]);
        
        // Inform the user that no products were found
        toast({
          title: "Keine Produkte gefunden",
          description: "Klicken Sie auf 'Produktdaten neu einlesen' um Beispielprodukte zu laden.",
        });
        
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Produkte. Bitte versuchen Sie es später erneut.",
        variant: "destructive"
      });
      setProducts([]);
      throw error;
    }
  }, [setProducts, toast]);

  const updateStock = async (id: string, newStock: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', id);

      if (error) {
        console.error("Error updating stock:", error);
        throw error;
      }

      setProducts(prev => prev.map(product =>
        String(product.id) === id ? { ...product, stock: newStock } : product
      ));
      
      return true;
    } catch (error) {
      console.error("Error updating stock:", error);
      toast({
        title: "Fehler",
        description: "Lagerbestand konnte nicht aktualisiert werden.",
        variant: "destructive"
      });
      return false;
    }
  };

  const seedProductsToSupabase = async () => {
    try {
      console.log("Starting to seed products to Supabase...");
      
      // Import the seed products data module
      const seedProductsModule = await import('@/utils/seed-products');
      const seedProducts = seedProductsModule.seedProductsData();
      
      // Check if seedProducts is a valid array
      if (!Array.isArray(seedProducts)) {
        console.error("Seed products data is not an array:", seedProducts);
        throw new Error("Invalid seed products data format");
      }
      
      console.log(`Generated ${seedProducts.length} seed products`);
      
      const supabaseProducts = seedProducts.map(product => ({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description || '',
        image: product.image || '',
        ingredients: product.ingredients || '',
        weight: product.weight || '',
        stock: product.stock || 50,
        agerestricted: product.ageRestricted || false
      }));
      
      console.log(`Preparing to insert ${supabaseProducts.length} products to Supabase`);
      
      const batchSize = 20;
      for (let i = 0; i < supabaseProducts.length; i += batchSize) {
        const batch = supabaseProducts.slice(i, i + batchSize);
        console.log(`Inserting batch ${i / batchSize + 1} with ${batch.length} products`);
        
        const { error } = await supabase
          .from('products')
          .insert(batch);
        
        if (error) {
          console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
          throw error;
        }
        console.log(`Inserted batch ${i / batchSize + 1} successfully`);
      }
      
      toast({
        title: "Produkte geladen",
        description: `${supabaseProducts.length} Produkte erfolgreich in die Datenbank geladen.`,
      });
      
      return await fetchProducts();
      
    } catch (error) {
      console.error("Error seeding products to Supabase:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Hinzufügen der Produkte zur Datenbank.",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    fetchProducts,
    updateStock,
    seedProductsToSupabase
  };
};
