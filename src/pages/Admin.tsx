
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import { Product } from '../types/product';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Loader2, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  const { refreshProducts, seedProducts } = useAdmin();

  // Initialize products when the Admin page loads
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    console.log("Loading products");
    setIsInitializing(true);
    
    try {
      await refreshProducts();
    } catch (error) {
      console.error("Error initializing products:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Produkte.",
        duration: 3000,
        variant: "destructive"
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSeedProducts = async () => {
    setIsSeeding(true);
    try {
      await seedProducts();
      toast({
        title: "Produkte geladen",
        description: "Produkte wurden erfolgreich in die Datenbank geladen.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error seeding products:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Produkte.",
        duration: 3000,
        variant: "destructive"
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    // Scroll to the form when editing on mobile
    if (window.innerWidth < 768) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleCancel = () => {
    setEditingProduct(undefined);
  };

  return (
    <AdminLayout 
      onRefresh={loadProducts}
      isRefreshing={isInitializing}
    >
      {isInitializing ? (
        <div className="flex justify-center items-center p-8">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-brings-primary mx-auto mb-4" />
            <p>Produkte werden geladen...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
          <div className="lg:col-span-1 lg:sticky lg:top-24 self-start max-h-[calc(100vh-200px)] overflow-auto">
            <ScrollArea className="pr-4">
              <AdminProductForm 
                initialData={editingProduct} 
                onCancel={handleCancel}
              />
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Administration</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Wenn keine Produkt vorhanden sind, kannst du diese hier neu einlesen.
                </p>
                <Button 
                  onClick={handleSeedProducts} 
                  disabled={isSeeding}
                  className="w-full"
                >
                  {isSeeding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Produkte werden geladen...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      Produktdaten neu einlesen
                    </>
                  )}
                </Button>
              </div>
            </ScrollArea>
          </div>
          
          <div className="lg:col-span-2">
            <AdminProductList onEdit={handleEdit} />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Admin;
