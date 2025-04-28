import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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
} from 'recharts';

// Order type based on the AdminDashboard type
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

interface AnalyticsTabProps {
  orders: Order[] | undefined;
  isLoading: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ orders, isLoading }) => {
  // Helper function to calculate total revenue
  const calculateTotalRevenue = (orders: Order[] | undefined) => {
    if (!orders || !orders.length) return 0;
    return orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  };

  // Helper function to group orders by payment method
  const getPaymentMethodStats = (orders: Order[] | undefined) => {
    if (!orders || !orders.length) return [];
    
    const paymentMethods: Record<string, number> = {};
    
    orders.forEach(order => {
      const method = order.payment_method;
      paymentMethods[method] = (paymentMethods[method] || 0) + 1;
    });
    
    return Object.entries(paymentMethods).map(([name, value]) => {
      let displayName;
      switch (name) {
        case 'cash': displayName = 'Barzahlung'; break;
        case 'card': displayName = 'Kartenzahlung'; break;
        case 'twint': displayName = 'TWINT'; break;
        default: displayName = name;
      }
      
      return { name: displayName, value };
    });
  };

  // Helper function to group orders by status
  const getOrderStatusStats = (orders: Order[] | undefined) => {
    if (!orders || !orders.length) return [];
    
    const statuses: Record<string, number> = {};
    
    orders.forEach(order => {
      const status = order.status;
      statuses[status] = (statuses[status] || 0) + 1;
    });
    
    return Object.entries(statuses).map(([name, value]) => {
      let displayName;
      switch (name) {
        case 'pending': displayName = 'Offen'; break;
        case 'processing': displayName = 'In Bearbeitung'; break;
        case 'in_delivery': displayName = 'In Lieferung'; break;
        case 'delivered': displayName = 'Geliefert'; break;
        case 'cancelled': displayName = 'Storniert'; break;
        default: displayName = name;
      }
      
      return { name: displayName, value };
    });
  };

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(value);
  };

  // Group orders by date
  const getOrdersByDate = (orders: Order[] | undefined) => {
    if (!orders || !orders.length) return [];
    
    const ordersByDate: Record<string, number> = {};
    
    orders.forEach(order => {
      const date = new Date(order.created_at).toLocaleDateString('de-CH');
      ordersByDate[date] = (ordersByDate[date] || 0) + Number(order.total_amount);
    });
    
    return Object.entries(ordersByDate).map(([date, revenue]) => ({
      date,
      revenue
    }));
  };

  // Calculate total revenue
  const totalRevenue = calculateTotalRevenue(orders);
  // Get payment method stats
  const paymentMethodStats = getPaymentMethodStats(orders);
  // Get order status stats
  const orderStatusStats = getOrderStatusStats(orders);
  // Get orders by date
  const ordersByDate = getOrdersByDate(orders);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Verkaufsstatistik</h2>
      
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Basierend auf {orders?.length || 0} Bestellungen
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Durchschnittlicher Bestellwert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(orders && orders.length > 0 ? totalRevenue / orders.length : 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pro Bestellung
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Beliebte Zahlungsarten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {paymentMethodStats.map((method, index) => (
                    <div key={method.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{method.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{method.value}</span>
                        <div className="w-20 h-2 bg-gray-100 rounded-full">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${(method.value / orders!.length) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Umsatz nach Datum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {ordersByDate.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={ordersByDate}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), 'Umsatz']}
                        />
                        <Legend />
                        <Bar 
                          dataKey="revenue" 
                          name="Umsatz" 
                          fill="#0088FE" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Keine Daten verfügbar
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bestellstatus-Verteilung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {orderStatusStats.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={orderStatusStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {orderStatusStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [`${value} Bestellungen`, 'Anzahl']}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Keine Daten verfügbar
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsTab; 