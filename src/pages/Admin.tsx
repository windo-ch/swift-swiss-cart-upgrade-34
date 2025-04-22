
import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import { Product } from '../types/product';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RefreshCw, Loader2, Database, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/hooks/use-admin';

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { products, refreshProducts, seedProducts, isLoading, isInitialized } = useAdmin();

  const handleRefresh = async () => {
    console.log("Manual refresh triggered");
    setError(null);
    
    try {
      await refreshProducts();
      toast({
        title: "Erfolgreich",
        description: "Produkte wurden aktualisiert.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error refreshing products:", error);
      setError("Fehler beim Laden der Produkte. Bitte versuchen Sie es später erneut.");
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Produkte.",
        duration: 3000,
        variant: "destructive"
      });
    }
  };

  const handleSeedProducts = async () => {
    setIsSeeding(true);
    setError(null);
    try {
      await seedProducts();
      toast({
        title: "Produkte geladen",
        description: "Produkte wurden erfolgreich in die Datenbank geladen.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error seeding products:", error);
      setError("Fehler beim Laden der Produkte in die Datenbank.");
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

  // If there's an error, show a helpful error message with retry option
  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-lg font-semibold text-red-700">Fehler beim Laden</h2>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex gap-3">
            <Button onClick={handleRefresh} variant="outline">
              Erneut versuchen
            </Button>
            <Button onClick={handleSeedProducts} disabled={isSeeding}>
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
        </div>
      </AdminLayout>
    );
  }

  // Show a full-page loading state
  if (!isInitialized || isLoading) {
    return (
      <AdminLayout onRefresh={handleRefresh} isRefreshing={isLoading}>
        <div className="flex justify-center items-center p-8 min-h-[60vh]">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-brings-primary mx-auto mb-6" />
            <p className="text-lg font-medium">Produkte werden geladen...</p>
            <p className="text-gray-500 mt-2">Bitte haben Sie einen Moment Geduld.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  // Empty state when there are no products
  const showEmptyState = products.length === 0;

  return (
    <AdminLayout 
      onRefresh={handleRefresh}
      isRefreshing={isLoading}
    >
      {showEmptyState && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 my-6 text-center">
          <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Keine Produkte gefunden</h2>
          <p className="text-gray-600 mb-6">
            Es wurden keine Produkte in der Datenbank gefunden. Klicken Sie auf den Button unten, um Beispielprodukte zu laden.
          </p>
          <Button 
            onClick={handleSeedProducts} 
            disabled={isSeeding} 
            size="lg"
            className="bg-brings-primary hover:bg-brings-primary/90"
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
      )}
      
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
        
        {!showEmptyState && (
          <div className="lg:col-span-2">
            <AdminProductList onEdit={handleEdit} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Admin;
