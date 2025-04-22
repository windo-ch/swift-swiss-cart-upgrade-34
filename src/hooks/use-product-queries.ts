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
    setIsLoading(true);
    
    try {
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase error when fetching products:", error);
        throw error;
      }
      
      if (productsData && productsData.length > 0) {
        console.log(`Fetched ${productsData.length} products:`, productsData[0]);
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
        console.log("No products found in Supabase, will suggest seeding products");
        setProducts([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Produkte.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setProducts, setIsLoading, toast]);

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

  const seedProductsToSupabase = async () => {
    try {
      console.log("Starting to seed products to Supabase...");
      
      const { seedProductsData } = await import('@/utils/seed-products');
      
      const seedProducts = seedProductsData();
      
      if (!seedProducts || !Array.isArray(seedProducts)) {
        console.error("Seed products data is not an array or is undefined");
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
