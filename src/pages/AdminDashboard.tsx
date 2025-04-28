import React, { useState, useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { 
  Package, 
  AlertCircle, 
  Timer, 
  TrendingUp, 
  ShoppingCart, 
  Map, 
  RefreshCw, 
  Truck,
  Check,
  X,
  Plus,
  Minus,
  Shield,
  Bug,
  CheckCircle
} from 'lucide-react';
import { getLowInventoryProducts, updateProductInventory } from '@/services/inventoryService';
import { Product } from '@/types/supabase';
import { Json } from '@/integrations/supabase/types';
import { useAdmin, AdminProvider } from '@/contexts/AdminContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer,
  ComposedChart,
  Line
} from 'recharts';
// Import dashboard tab components
import {
  OverviewTab,
  OrdersTab,
  DeliveriesTab,
  InventoryTab,
  AnalyticsTab
} from '@/components/admin/dashboard';
import { Link } from 'react-router-dom';

// Define the Order type to fix TypeScript errors
interface Order {
  id: string;
  delivery_address: any;
  total_amount: number;
  status: string;
  created_at: string;
  payment_method: string;
  estimated_delivery_time?: string | null;
  order_items: any[];
  user_id: string;
  delivery_fee?: number;
  discount_amount?: number;
}

// Create a local queryClient for this component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Create a wrapped version of the component that includes the necessary providers
const AdminDashboardWithProviders = () => {
  // Force enable debug mode for admin dashboard
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('adminDebugMode', 'true');
    } catch (e) {
      console.error("Failed to set debug mode:", e);
    }
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <AdminDashboardContent />
      </AdminProvider>
    </QueryClientProvider>
  );
};

// The main dashboard content, now separated to be wrapped with providers
const AdminDashboardContent = () => {
  console.log("📊 AdminDashboard - Component initialization started");
  
  // Add location tracking to debug redirects
  const location = useLocation();
  const { toast } = useToast();
  
  // Check for debug mode
  const isDebugMode = () => {
    try {
      return localStorage.getItem('adminDebugMode') === 'true';
    } catch (e) {
      return false;
    }
  };
  
  // Reference to the guaranteed admin access configuration
  const GUARANTEED_ADMIN_ACCESS = true;
  
  // Get admin context and log results
  let adminContext;
  try {
    console.log("📊 AdminDashboard - About to call useAdmin");
    adminContext = useAdmin();
    console.log("📊 AdminDashboard - useAdmin result:", adminContext ? "Succeeded" : "Failed/Null");
  } catch (error) {
    console.error("📊 AdminDashboard - Error using useAdmin hook:", error);
  }
  
  // Log admin dashboard rendering
  useEffect(() => {
    console.log("📊 AdminDashboard - useEffect rendering", { 
      pathname: location.pathname,
      search: location.search,
      debugMode: isDebugMode(),
      guaranteedAccess: GUARANTEED_ADMIN_ACCESS
    });
  }, [location]);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showInventoryDialog, setShowInventoryDialog] = useState(false);
  const [inventoryAmount, setInventoryAmount] = useState(0);
  const [isUpdatingInventory, setIsUpdatingInventory] = useState(false);
  
  // Fetch orders data using direct Supabase queries to avoid context issues
  const { 
    data: ordersData = [], 
    isLoading: isOrdersLoading, 
    refetch: refetchOrders 
  } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      console.log("📊 AdminDashboard - Fetching orders data directly from Supabase");
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .order('created_at', { ascending: false })
          .limit(50);
        
        if (error) throw error;
        console.log("📊 AdminDashboard - Orders fetched:", data?.length || 0);
        return data || [];
      } catch (err) {
        console.error("📊 AdminDashboard - Error fetching orders:", err);
        return [];
      }
    }
  });
  
  // Fetch low inventory products directly from Supabase to avoid context issues
  const {
    data: lowInventoryProducts = [],
    isLoading: isInventoryLoading,
    refetch: refetchInventory
  } = useQuery({
    queryKey: ['low-inventory'],
    queryFn: async () => {
      console.log("📊 AdminDashboard - Fetching low inventory products directly");
      try {
        return await getLowInventoryProducts(10);
      } catch (error) {
        console.error("📊 AdminDashboard - Error fetching low inventory products:", error);
        return [];
      }
    }
  });
  
  // Calculate dashboard statistics
  const pendingOrders = ordersData?.filter(order => order.status === 'pending') || [];
  const activeDeliveries = ordersData?.filter(order => order.status === 'in_delivery') || [];
  const completedOrders = ordersData?.filter(order => order.status === 'delivered') || [];
  
  const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
  const avgOrderValue = ordersData?.length ? totalRevenue / ordersData.length : 0;
  
  const handleRefresh = async () => {
    console.log("📊 AdminDashboard - Manual refresh triggered");
    setIsRefreshing(true);
    
    try {
      await Promise.all([
        refetchOrders(),
        refetchInventory()
      ]);
      
      toast({
        title: "Daten aktualisiert",
        description: "Dashboard-Daten wurden erfolgreich aktualisiert.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Aktualisieren der Dashboard-Daten.",
        duration: 3000,
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // New function to update order status
  const updateOrderStatus = async (orderId: string, newStatus: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  };
  
  // Handle status update
  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;
    
    setIsUpdatingStatus(true);
    try {
      const success = await updateOrderStatus(selectedOrder.id, newStatus);
      
      if (success) {
        toast({
          title: "Status aktualisiert",
          description: `Bestellung #${selectedOrder.id.slice(0, 8)} ist jetzt ${getStatusDisplay(newStatus)}`,
          duration: 3000,
        });
        
        // Refresh the data
        await refetchOrders();
        setShowStatusDialog(false);
      } else {
        throw new Error("Status konnte nicht aktualisiert werden");
      }
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Status konnte nicht aktualisiert werden",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  // Open status dialog
  const openStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowStatusDialog(true);
  };
  
  // Helper function to display status in German
  const getStatusDisplay = (status: string): string => {
    switch (status) {
      case 'pending': return 'Offen';
      case 'processing': return 'In Bearbeitung';
      case 'in_delivery': return 'In Lieferung';
      case 'delivered': return 'Geliefert';
      case 'cancelled': return 'Storniert';
      default: return status;
    }
  };
  
  // Add function for inventory update
  const handleInventoryUpdate = async () => {
    if (!selectedProduct || inventoryAmount === 0) return;
    
    setIsUpdatingInventory(true);
    try {
      await updateProductInventory(selectedProduct.id, 
        Math.max(0, (selectedProduct.stock || 0) + inventoryAmount));
      
      toast({
        title: "Lagerbestand aktualisiert",
        description: `${selectedProduct.name} Lagerbestand wurde aktualisiert.`,
        duration: 3000,
      });
      
      // Refresh data
      await refetchInventory();
      setShowInventoryDialog(false);
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Lagerbestand konnte nicht aktualisiert werden.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsUpdatingInventory(false);
    }
  };
  
  // Add function to open inventory dialog
  const openInventoryDialog = (product: Product) => {
    setSelectedProduct(product);
    setInventoryAmount(0);
    setShowInventoryDialog(true);
  };

  return (
    <AdminLayout noProvider={true}>
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-green-600 mr-2" />
            <div>
              <h3 className="font-medium text-green-800">Admin Dashboard Access Enabled</h3>
              <p className="text-sm text-green-600">
                {GUARANTEED_ADMIN_ACCESS ? (
                  <>Access is guaranteed by code configuration.</>
                ) : isDebugMode() ? (
                  <>Access is enabled via debug mode.</>
                ) : (
                  <>Access is granted through normal authentication.</>
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
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <Button 
          variant="outline" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Aktualisieren
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Übersicht
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Bestellungen
          </TabsTrigger>
          <TabsTrigger value="deliveries" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Lieferungen
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Lagerbestand
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analysen
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <OverviewTab 
            pendingOrdersCount={pendingOrders.length}
            activeDeliveriesCount={activeDeliveries.length}
            totalRevenue={totalRevenue}
            avgOrderValue={avgOrderValue}
            lowInventoryCount={lowInventoryProducts?.length || 0}
            isLoading={isOrdersLoading || isInventoryLoading}
          />
        </TabsContent>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <OrdersTab 
            orders={pendingOrders as Order[]}
            isLoading={isOrdersLoading}
            openStatusDialog={openStatusDialog}
          />
        </TabsContent>
        
        {/* Deliveries Tab */}
        <TabsContent value="deliveries">
          <DeliveriesTab 
            deliveries={activeDeliveries as Order[]}
            isLoading={isOrdersLoading}
            openStatusDialog={openStatusDialog}
          />
        </TabsContent>
        
        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <InventoryTab 
            lowInventoryProducts={lowInventoryProducts || []}
            isLoading={isInventoryLoading}
            openInventoryDialog={openInventoryDialog}
          />
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <AnalyticsTab 
            orders={ordersData as Order[]}
            isLoading={isOrdersLoading}
          />
        </TabsContent>
      </Tabs>
      
      {/* Order Status Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bestellstatus aktualisieren</DialogTitle>
            <DialogDescription>
              Aktueller Status: {selectedOrder && getStatusDisplay(selectedOrder.status)}
            </DialogDescription>
          </DialogHeader>
          
          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Wählen Sie einen Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Offen</SelectItem>
              <SelectItem value="processing">In Bearbeitung</SelectItem>
              <SelectItem value="in_delivery">In Lieferung</SelectItem>
              <SelectItem value="delivered">Geliefert</SelectItem>
              <SelectItem value="cancelled">Storniert</SelectItem>
            </SelectContent>
          </Select>
          
          <DialogFooter>
            <Button onClick={() => setShowStatusDialog(false)} variant="outline">
              Abbrechen
            </Button>
            <Button onClick={handleStatusUpdate} disabled={isUpdatingStatus}>
              {isUpdatingStatus ? 'Aktualisiere...' : 'Status aktualisieren'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Inventory Update Dialog */}
      <Dialog open={showInventoryDialog} onOpenChange={setShowInventoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lagerbestand aktualisieren</DialogTitle>
            <DialogDescription>
              {selectedProduct?.name} - Aktueller Bestand: {selectedProduct?.stock || 0}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center justify-center mt-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setInventoryAmount(prev => prev - 1)}
              disabled={inventoryAmount <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              className="mx-4 text-center w-24"
              value={inventoryAmount}
              onChange={(e) => setInventoryAmount(parseInt(e.target.value) || 0)}
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setInventoryAmount(prev => prev + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowInventoryDialog(false)} variant="outline">
              Abbrechen
            </Button>
            <Button onClick={handleInventoryUpdate} disabled={isUpdatingInventory || inventoryAmount === 0}>
              {isUpdatingInventory ? 'Aktualisiere...' : 'Bestand aktualisieren'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

// Export the wrapped version of the component
export default AdminDashboardWithProviders;
