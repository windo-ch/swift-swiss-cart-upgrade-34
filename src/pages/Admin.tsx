import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import { Product } from '../types/product';
import { forceReinitializeAdminProducts, logAdminProducts } from '../utils/admin-utils';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Shield, Bug, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Reference to the guaranteed admin access configuration
const GUARANTEED_ADMIN_ACCESS = true;

// Check if debug mode is enabled in localStorage
const isDebugMode = () => {
  try {
    return localStorage.getItem('adminDebugMode') === 'true';
  } catch (e) {
    return false;
  }
};

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [isInitializing, setIsInitializing] = useState(false);
  const [debugMode, setDebugMode] = useState(isDebugMode());
  const { toast } = useToast();

  // Initialize products when the Admin page loads
  useEffect(() => {
    refreshProducts();
    
    // Check debug mode status
    setDebugMode(isDebugMode());
  }, []);

  const refreshProducts = () => {
    console.log("Initializing admin products");
    setIsInitializing(true);
    
    // Use async function inside
    const doInitialize = async () => {
      try {
        // Force reinitialize products from Supabase
        await forceReinitializeAdminProducts();
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
    
    // Execute the async function
    doInitialize();
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

  const toggleDebugMode = () => {
    const newMode = !debugMode;
    try {
      if (newMode) {
        localStorage.setItem('adminDebugMode', 'true');
      } else {
        localStorage.removeItem('adminDebugMode');
      }
      setDebugMode(newMode);
      toast({
        title: newMode ? 'Debug Mode Enabled' : 'Debug Mode Disabled',
        description: newMode 
          ? 'Admin pages can now be accessed directly.' 
          : 'Admin pages will require proper authentication again.',
      });
      
    } catch (error) {
      console.error('Error toggling debug mode:', error);
      toast({
        title: 'Error',
        description: 'Failed to update debug mode setting.',
        variant: 'destructive'
      });
    }
  };

  return (
    <AdminLayout 
      onRefresh={refreshProducts}
      isRefreshing={isInitializing}
    >
      {/* Admin Status Banner */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-green-600 mr-2" />
            <div>
              <h3 className="font-medium text-green-800">Admin Access Enabled</h3>
              <p className="text-sm text-green-600">
                {GUARANTEED_ADMIN_ACCESS ? (
                  <>Admin access is guaranteed by code configuration.</>
                ) : debugMode ? (
                  <>Admin access is enabled via debug mode.</>
                ) : (
                  <>Admin access is granted through normal authentication.</>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link to="/admin-troubleshooting">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Bug className="h-4 w-4" />
                <span className="hidden sm:inline">Troubleshooting</span>
              </Button>
            </Link>
            
            <Link to="/admin-test">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Test Page</span>
              </Button>
            </Link>
            
            <Button 
              variant={debugMode ? "destructive" : "default"} 
              size="sm"
              onClick={toggleDebugMode}
            >
              {debugMode ? 'Disable Debug' : 'Enable Debug'}
            </Button>
          </div>
        </div>
      </div>
      
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
