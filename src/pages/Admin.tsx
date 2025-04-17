
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import { Product } from '../types/product';
import { forceReinitializeAdminProducts, logAdminProducts } from '../utils/admin-utils';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [isInitializing, setIsInitializing] = useState(false);
  const { toast } = useToast();

  // Initialize products when the Admin page loads
  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = () => {
    console.log("Initializing admin products");
    setIsInitializing(true);
    
    try {
      // Force reinitialize products from the seed data
      forceReinitializeAdminProducts();
      logAdminProducts(); // Debug: log admin products after initialization
      
      // Show notification that products are loaded
      const storedProducts = localStorage.getItem('adminProducts');
      const productCount = storedProducts ? JSON.parse(storedProducts).length : 0;
      
      if (productCount > 0) {
        toast({
          title: "Produkte geladen",
          description: `${productCount} Produkte sind verfügbar für d'Bearbeitung.`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error initializing admin products:", error);
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
      onRefresh={refreshProducts}
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
