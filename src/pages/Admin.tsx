
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AdminProvider } from '../contexts/AdminContext';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import { Product } from '../types/product';
import { Button } from '@/components/ui/button';
import { Truck, Package, RefreshCw } from 'lucide-react';
import { initializeAdminProducts, logAdminProducts } from '../utils/admin-utils';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [isInitializing, setIsInitializing] = useState(false);
  const { toast } = useToast();

  // Initialize products when the Admin page loads
  useEffect(() => {
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
          title: "Produkte gladen",
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
  }, [toast]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancel = () => {
    setEditingProduct(undefined);
  };

  const handleForceRefresh = () => {
    setIsInitializing(true);
    try {
      initializeAdminProducts();
      toast({
        title: "Produkte neu geladen",
        description: "Alle Produkte wurden erfolgreich neu geladen.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error refreshing products:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Neuladen der Produkte.",
        duration: 3000,
        variant: "destructive"
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin-Bereich</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleForceRefresh}
                disabled={isInitializing}
              >
                <RefreshCw size={16} className={isInitializing ? "animate-spin" : ""} />
                Produkte neu laden
              </Button>
              <Link to="/admin/orders">
                <Button variant="outline" className="flex items-center gap-2">
                  <Truck size={16} />
                  Bstellig Tracking
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center gap-2" disabled>
                <Package size={16} />
                Produkte
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <AdminProductForm 
                initialData={editingProduct} 
                onCancel={handleCancel}
              />
            </div>
            
            <div className="lg:col-span-2">
              <AdminProductList onEdit={handleEdit} />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AdminProvider>
  );
};

export default Admin;
