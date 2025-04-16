
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import { Product } from '../types/product';
import { initializeAdminProducts, logAdminProducts } from '../utils/admin-utils';
import { useToast } from '@/components/ui/use-toast';

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
      // Force reinitialize products from the store data
      initializeAdminProducts();
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
    // Scroll to the form when editing
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCancel = () => {
    setEditingProduct(undefined);
  };

  return (
    <AdminLayout 
      onRefresh={refreshProducts}
      isRefreshing={isInitializing}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
          <AdminProductForm 
            initialData={editingProduct} 
            onCancel={handleCancel}
          />
        </div>
        
        <div className="lg:col-span-2">
          <AdminProductList onEdit={handleEdit} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
