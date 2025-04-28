import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Button } from '@/components/ui/button';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Truck, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  Users, 
  Settings, 
  Shield,
  LayoutDashboard,
  AlertTriangle
} from 'lucide-react';
import { initializeAdminProducts } from '@/utils/admin-utils';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import ProductSyncHandler from './ProductSyncHandler';

interface AdminLayoutProps {
  children: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  noProvider?: boolean; // Add prop to optionally skip provider wrapping
}

const AdminLayout = ({ children, onRefresh, isRefreshing = false, noProvider = false }: AdminLayoutProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const currentPath = location.pathname;
  
  // Determine active tab based on the current path
  let activeTab = 'products';
  if (currentPath.includes('/admin/orders')) {
    activeTab = 'orders';
  } else if (currentPath.includes('/admin/dashboard')) {
    activeTab = 'dashboard';
  }
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleForceRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      try {
        // Use async/await pattern for initializeAdminProducts
        const doRefresh = async () => {
          try {
            await initializeAdminProducts();
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
        };
        
        doRefresh();
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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Create content without AdminProvider wrapper
  const content = (
    <>
      {/* Include the ProductSyncHandler for backward compatibility */}
      <ProductSyncHandler />
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex">
          {/* Sidebar */}
          <div className={`bg-gray-100 border-r ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 hidden md:block`}>
            <div className="p-4 flex justify-between items-center">
              <h2 className={`font-bold text-gray-700 ${sidebarCollapsed ? 'hidden' : 'block'}`}>Admin-Bereich</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSidebar}
                className="text-gray-500"
              >
                {sidebarCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </Button>
            </div>
            
            <Separator />
            
            <nav className="py-4">
              <ul className="space-y-2">
                {/* Dashboard Link - NEW */}
                <li>
                  <Link to="/admin/dashboard">
                    <div className={`flex items-center px-4 py-2 ${activeTab === 'dashboard' ? 'bg-brings-primary text-white' : 'text-gray-700 hover:bg-gray-200'} rounded-lg mx-2`}>
                      <LayoutDashboard size={20} />
                      {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
                    </div>
                  </Link>
                </li>
                
                <li>
                  <Link to="/admin">
                    <div className={`flex items-center px-4 py-2 ${activeTab === 'products' ? 'bg-brings-primary text-white' : 'text-gray-700 hover:bg-gray-200'} rounded-lg mx-2`}>
                      <Package size={20} />
                      {!sidebarCollapsed && <span className="ml-3">Produkte</span>}
                    </div>
                  </Link>
                </li>
                
                <li>
                  <Link to="/admin/orders">
                    <div className={`flex items-center px-4 py-2 ${activeTab === 'orders' ? 'bg-brings-primary text-white' : 'text-gray-700 hover:bg-gray-200'} rounded-lg mx-2`}>
                      <Truck size={20} />
                      {!sidebarCollapsed && <span className="ml-3">Bestellungen</span>}
                    </div>
                  </Link>
                </li>
                
                <li>
                  <div className={`flex items-center px-4 py-2 text-gray-500 rounded-lg mx-2`}>
                    <Users size={20} />
                    {!sidebarCollapsed && <span className="ml-3">Kunden</span>}
                  </div>
                </li>
                
                <li>
                  <div className={`flex items-center px-4 py-2 text-gray-500 rounded-lg mx-2`}>
                    <Settings size={20} />
                    {!sidebarCollapsed && <span className="ml-3">Einstellungen</span>}
                  </div>
                </li>
                
                {/* Add link to database diagnostic page */}
                <li>
                  <Link to="/db-diagnostic">
                    <div className={`flex items-center px-4 py-2 ${location.pathname === '/db-diagnostic' ? 'bg-brings-primary text-white' : 'text-gray-700 hover:bg-gray-200'} rounded-lg mx-2`}>
                      <AlertTriangle size={20} />
                      {!sidebarCollapsed && <span className="ml-3">Datenbank Diagnose</span>}
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
            
            {!sidebarCollapsed && (
              <div className="absolute bottom-20 w-64 px-4">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 w-full"
                  onClick={handleForceRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                  {isRefreshing ? "Wird geladen..." : "Daten aktualisieren"}
                </Button>
              </div>
            )}
          </div>
          
          {/* Main content */}
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="md:hidden flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Admin-Bereich</h1>
              <div className="flex gap-2">
                <Tabs value={activeTab} className="mb-0">
                  <TabsList>
                    <Link to="/admin/dashboard">
                      <TabsTrigger value="dashboard" className="flex items-center gap-2">
                        <LayoutDashboard size={16} />
                        Dashboard
                      </TabsTrigger>
                    </Link>
                    <Link to="/admin">
                      <TabsTrigger value="products" className="flex items-center gap-2">
                        <Package size={16} />
                        Produkte
                      </TabsTrigger>
                    </Link>
                    <Link to="/admin/orders">
                      <TabsTrigger value="orders" className="flex items-center gap-2">
                        <Truck size={16} />
                        Bestellungen
                      </TabsTrigger>
                    </Link>
                    <Link to="/db-diagnostic">
                      <TabsTrigger value="diagnostic" className="flex items-center gap-2">
                        <AlertTriangle size={16} />
                        Diagnose
                      </TabsTrigger>
                    </Link>
                  </TabsList>
                </Tabs>
                
                {activeTab === 'products' && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleForceRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="hidden md:flex md:items-center md:justify-between mb-6">
              <div className="flex items-center">
                <Shield className="text-brings-primary mr-2" size={24} />
                <h1 className="text-2xl font-bold">
                  {activeTab === 'dashboard' ? 'Admin Dashboard' : 
                   activeTab === 'products' ? 'Produkte verwalten' : 
                   'Bestellungen verfolgen'}
                </h1>
              </div>
              
              {activeTab === 'products' && !isRefreshing && (
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
            
            {children}
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );

  // Conditionally wrap with AdminProvider based on the noProvider prop
  return noProvider ? content : (
    <AdminProvider>
      {content}
    </AdminProvider>
  );
};

export default AdminLayout;
