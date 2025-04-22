
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

      if (error) throw error;
      
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
      } else {
        // If no products returned from Supabase, try to seed
        console.log("No products found in Supabase, seeding products...");
        await seedProductsToSupabase();
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Produkte.",
        variant: "destructive"
      });
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

  // Function to seed products to Supabase if none exist
  const seedProductsToSupabase = async () => {
    try {
      console.log("Starting to seed products to Supabase...");
      
      // Import the seed data
      const { seedProductsData } = await import('@/utils/seed-products');
      
      // Use seedProductsData to generate seed products
      seedProductsData();
      
      // Get seed products from localStorage
      const storedProducts = localStorage.getItem('adminProducts');
      if (!storedProducts) {
        console.error("No seed products available in localStorage");
        return;
      }
      
      const seedProducts = JSON.parse(storedProducts);
      console.log(`Preparing to insert ${seedProducts.length} products to Supabase`);
      
      // Prepare products for Supabase (format correctly)
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
      
      // Insert products in batches of 20 to avoid hitting limits
      const batchSize = 20;
      for (let i = 0; i < supabaseProducts.length; i += batchSize) {
        const batch = supabaseProducts.slice(i, i + batchSize);
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
      
      // Fetch the newly inserted products
      await fetchProducts();
      
    } catch (error) {
      console.error("Error seeding products to Supabase:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Hinzufügen der Produkte zur Datenbank.",
        variant: "destructive"
      });
    }
  };

  return {
    fetchProducts,
    updateStock,
    seedProductsToSupabase
  };
};
