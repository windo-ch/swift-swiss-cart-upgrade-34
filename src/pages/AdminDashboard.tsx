
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  AlertCircle, 
  Timer, 
  TrendingUp, 
  ShoppingCart, 
  Map, 
  RefreshCw, 
  Truck 
} from 'lucide-react';
import { getLowInventoryProducts } from '@/services/inventoryService';
import { Product } from '@/types/supabase';
import { Json } from '@/integrations/supabase/types';

// Define the Order type based on what we actually have in the database
interface OrderAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  email?: string;
  phone?: string;
}

interface Order {
  id: string;
  delivery_address: OrderAddress;
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  // Fetch orders data
  const { 
    data: orders, 
    isLoading: isOrdersLoading, 
    refetch: refetchOrders 
  } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return (data || []) as Order[];
    }
  });
  
  // Fetch low inventory products
  const {
    data: lowInventoryProducts,
    isLoading: isInventoryLoading,
    refetch: refetchInventory
  } = useQuery({
    queryKey: ['low-inventory'],
    queryFn: async () => {
      return await getLowInventoryProducts(10);
    }
  });
  
  // Calculate dashboard statistics
  const pendingOrders = orders?.filter(order => order.status === 'pending') || [];
  const activeDeliveries = orders?.filter(order => order.status === 'in_delivery') || [];
  const completedOrders = orders?.filter(order => order.status === 'delivered') || [];
  
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
  const avgOrderValue = orders?.length ? totalRevenue / orders.length : 0;
  
  // Refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchOrders(), refetchInventory()]);
      toast({
        title: "Dashboard aktualisiert",
        description: "Die Daten wurden erfolgreich aktualisiert.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Aktualisieren der Daten.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing || isOrdersLoading || isInventoryLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            Aktualisieren
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="overview" className="flex-1 sm:flex-none">Übersicht</TabsTrigger>
            <TabsTrigger value="inventory" className="flex-1 sm:flex-none">Lagerbestand</TabsTrigger>
            <TabsTrigger value="delivery" className="flex-1 sm:flex-none">Lieferungen</TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1 sm:flex-none">Statistiken</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Offene Bestellungen" 
                value={pendingOrders.length} 
                icon={<ShoppingCart className="h-8 w-8 text-blue-500" />}
                description="Warten auf Bearbeitung"
                className="bg-blue-50"
              />
              
              <StatCard 
                title="Aktive Lieferungen" 
                value={activeDeliveries.length} 
                icon={<Truck className="h-8 w-8 text-green-500" />}
                description="Unterwegs zum Kunden"
                className="bg-green-50"
              />
              
              <StatCard 
                title="Produkte mit wenig Bestand" 
                value={lowInventoryProducts?.length || 0} 
                icon={<AlertCircle className="h-8 w-8 text-orange-500" />}
                description="Nachbestellung erforderlich"
                className="bg-orange-50"
              />
              
              <StatCard 
                title="Umsatz" 
                value={`CHF ${totalRevenue.toFixed(2)}`} 
                icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
                description={`Ø ${avgOrderValue.toFixed(2)} pro Bestellung`}
                className="bg-purple-50"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Neueste Bestellungen</CardTitle>
                </CardHeader>
                <CardContent>
                  {isOrdersLoading ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  ) : orders?.length ? (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-3 rounded-md bg-gray-50">
                          <div>
                            <p className="font-medium">
                              {order.delivery_address.firstName} {order.delivery_address.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.created_at).toLocaleString('de-CH')} • CHF {order.total_amount.toFixed(2)}
                            </p>
                          </div>
                          <StatusBadge status={order.status} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">Keine Bestellungen vorhanden</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lagerbestand niedrig</CardTitle>
                </CardHeader>
                <CardContent>
                  {isInventoryLoading ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  ) : lowInventoryProducts?.length ? (
                    <div className="space-y-4">
                      {lowInventoryProducts.slice(0, 5).map((product) => (
                        <div key={product.id} className="flex justify-between items-center p-3 rounded-md bg-gray-50">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              Kategorie: {product.category} • Bestand: {product.stock}
                            </p>
                          </div>
                          <InventoryBadge count={product.stock || 0} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">Alle Produkte haben ausreichend Lagerbestand</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory">
            <InventoryTab products={lowInventoryProducts || []} isLoading={isInventoryLoading} />
          </TabsContent>
          
          <TabsContent value="delivery">
            <DeliveryTab 
              pendingOrders={pendingOrders} 
              activeDeliveries={activeDeliveries} 
              isLoading={isOrdersLoading} 
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsTab orders={orders || []} isLoading={isOrdersLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

// Helper components
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
  className?: string;
}

const StatCard = ({ title, value, icon, description, className = '' }: StatCardProps) => (
  <Card className={`flex items-center ${className}`}>
    <CardContent className="flex p-4 w-full">
      <div className="mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Offen</span>;
    case 'in_delivery':
      return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">In Lieferung</span>;
    case 'delivered':
      return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Geliefert</span>;
    default:
      return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
  }
};

const InventoryBadge = ({ count }: { count: number }) => {
  if (count <= 3) {
    return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Kritisch</span>;
  } else if (count <= 10) {
    return <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">Niedrig</span>;
  } else {
    return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">OK</span>;
  }
};

// Tab components
const InventoryTab = ({ products, isLoading }: { products: Product[], isLoading: boolean }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Lagerbestandsverwaltung</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Produkte mit niedrigem Lagerbestand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Produkt</th>
                      <th className="text-left p-2">Kategorie</th>
                      <th className="text-left p-2">Lagerbestand</th>
                      <th className="text-right p-2">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b">
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.category}</td>
                        <td className="p-2">
                          <div className="flex items-center">
                            {product.stock}
                            <InventoryBadge count={product.stock || 0} />
                          </div>
                        </td>
                        <td className="p-2 text-right">
                          <Button size="sm" variant="outline">Bestand erhöhen</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const DeliveryTab = ({ 
  pendingOrders, 
  activeDeliveries, 
  isLoading 
}: { 
  pendingOrders: Order[], 
  activeDeliveries: Order[], 
  isLoading: boolean 
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Lieferungsverwaltung</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Offene Bestellungen ({pendingOrders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : pendingOrders.length ? (
              <div className="space-y-4">
                {pendingOrders.map(order => (
                  <div key={order.id} className="p-3 rounded-md bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {order.delivery_address.firstName} {order.delivery_address.lastName}
                        </p>
                        <p className="text-sm">
                          {order.delivery_address.address}, {order.delivery_address.postalCode} {order.delivery_address.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">CHF {order.total_amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.payment_method}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button size="sm" variant="outline" className="mr-2">Details</Button>
                      <Button size="sm">Zustellen</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">Keine offenen Bestellungen</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Aktive Lieferungen ({activeDeliveries.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : activeDeliveries.length ? (
              <div className="space-y-4">
                {activeDeliveries.map(order => (
                  <div key={order.id} className="p-3 rounded-md bg-green-50">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {order.delivery_address.firstName} {order.delivery_address.lastName}
                        </p>
                        <p className="text-sm">
                          {order.delivery_address.address}, {order.delivery_address.postalCode} {order.delivery_address.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">CHF {order.total_amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          <Timer className="h-4 w-4 inline-block mr-1" />
                          {order.estimated_delivery_time ? new Date(order.estimated_delivery_time).toLocaleTimeString('de-CH', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          }) : 'Unbekannt'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button size="sm" variant="outline" className="mr-2">
                        <Map className="h-4 w-4 mr-1" />
                        Route
                      </Button>
                      <Button size="sm">Abgeschlossen</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">Keine aktiven Lieferungen</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AnalyticsTab = ({ orders, isLoading }: { orders: Order[], isLoading: boolean }) => {
  // Simple analytics calculations
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  
  // Group orders by payment method
  const ordersByPaymentMethod: Record<string, number> = {};
  orders.forEach(order => {
    const method = order.payment_method || 'unknown';
    ordersByPaymentMethod[method] = (ordersByPaymentMethod[method] || 0) + 1;
  });
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Verkaufsstatistik</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Umsatz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-3xl font-bold mb-2">CHF {totalRevenue.toFixed(2)}</p>
                <p className="text-gray-500">Basierend auf {orders.length} Bestellungen</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Zahlungsmethoden</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(ordersByPaymentMethod).map(([method, count]) => (
                  <div key={method} className="flex justify-between items-center">
                    <p className="capitalize">{method}</p>
                    <div className="flex items-center">
                      <div className="h-2 bg-brings-primary rounded-full mr-2" 
                        style={{ width: `${Math.min((count / orders.length) * 100, 100)}px` }} />
                      <p>{count} ({Math.round((count / orders.length) * 100)}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 
