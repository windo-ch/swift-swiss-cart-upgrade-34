import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Clock, User, MapPin, CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

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

interface OrdersTabProps {
  orders: Order[];
  isLoading: boolean;
  openStatusDialog: (order: Order) => void;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders, isLoading, openStatusDialog }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'processing': return 'secondary';
      case 'in_delivery': return 'default';
      case 'delivered': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

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

  const getPaymentMethodDisplay = (method: string): string => {
    switch (method) {
      case 'cash': return 'Barzahlung';
      case 'card': return 'Kartenzahlung';
      case 'twint': return 'TWINT';
      default: return method;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Offene Bestellungen</h2>
        <Badge variant="outline">{orders.length} Bestellungen</Badge>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Keine offenen Bestellungen</h3>
            <p className="text-sm text-muted-foreground">
              Alle Bestellungen wurden bearbeitet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card 
              key={order.id} 
              className={`overflow-hidden border-l-4 ${
                order.status === 'pending' ? 'border-l-brings-primary' : 'border-l-gray-200'
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span>Bestellung #{order.id.slice(0, 8)}</span>
                      <Badge variant={getStatusVariant(order.status)}>
                        {getStatusDisplay(order.status)}
                      </Badge>
                    </CardTitle>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {formatDate(order.created_at)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">
                      {formatCurrency(order.total_amount)}
                    </span>
                    <div className="text-sm text-muted-foreground flex items-center justify-end mt-1">
                      <CreditCard className="h-4 w-4 inline mr-1" />
                      {getPaymentMethodDisplay(order.payment_method)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1 flex items-center">
                      <User className="h-4 w-4 inline mr-2" />
                      Kunde
                    </h4>
                    <p className="text-sm">
                      {order.delivery_address.firstName} {order.delivery_address.lastName}
                    </p>
                    {order.delivery_address.email && (
                      <p className="text-xs text-muted-foreground">{order.delivery_address.email}</p>
                    )}
                    {order.delivery_address.phone && (
                      <p className="text-xs text-muted-foreground">{order.delivery_address.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1 flex items-center">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Lieferadresse
                    </h4>
                    <p className="text-sm">{order.delivery_address.address}</p>
                    <p className="text-sm">
                      {order.delivery_address.postalCode} {order.delivery_address.city}
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Bestellte Artikel</h4>
                  <ul className="space-y-1">
                    {order.order_items.map((item, index) => (
                      <li key={index} className="text-sm flex justify-between">
                        <span>
                          {item.quantity}x {item.product_name || 'Produkt'}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="default" 
                    onClick={() => openStatusDialog(order)}
                  >
                    Status ändern
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab; 