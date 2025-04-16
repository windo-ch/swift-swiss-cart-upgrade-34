
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Button } from '@/components/ui/button';
import { AdminProvider } from '@/contexts/AdminContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, RefreshCw } from 'lucide-react';
import { initializeAdminProducts } from '@/utils/admin-utils';
import { useToast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const AdminLayout = ({ children, onRefresh, isRefreshing = false }: AdminLayoutProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const currentPath = location.pathname;
  const activeTab = currentPath.includes('/admin/orders') ? 'orders' : 'products';

  const handleForceRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
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
      }
    }
  };

  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin-Bereich</h1>
            {activeTab === 'products' && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleForceRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                Produkte neu laden
              </Button>
            )}
          </div>
          
          <Tabs value={activeTab} className="mb-6">
            <TabsList>
              <Link to="/admin">
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package size={16} />
                  Produkte
                </TabsTrigger>
              </Link>
              <Link to="/admin/orders">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Truck size={16} />
                  Bstellig Tracking
                </TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
          
          {children}
        </main>
        
        <Footer />
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
