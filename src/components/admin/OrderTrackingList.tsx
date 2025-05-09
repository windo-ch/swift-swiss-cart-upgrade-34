
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  Eye, 
  ShoppingBag, 
  Calendar, 
  User,
  Package
} from 'lucide-react';
import OrderDetails from './OrderDetails';
import UpdateOrderStatus from './UpdateOrderStatus';
import { formatCurrency } from '@/utils/format-utils';
import { Order } from '@/types/order';

interface OrderTrackingListProps {
  orders: Order[];
  status: string;
}

const OrderTrackingList = ({ orders, status }: OrderTrackingListProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);

  const statusBadge = (orderStatus: string) => {
    switch (orderStatus) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock size={14} className="mr-1" /> Offe</Badge>;
      case 'in_delivery':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Truck size={14} className="mr-1" /> In Lieferig</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle size={14} className="mr-1" /> Abgschlosse</Badge>;
      default:
        return <Badge variant="outline">{orderStatus}</Badge>;
    }
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

  const formatAddress = (address: any) => {
    if (!address) return '';
    
    if (typeof address === 'string') {
      try {
        address = JSON.parse(address);
      } catch (e) {
        return 'Invalid address';
      }
    }

    if (address.firstName) {
      return `${address.firstName} ${address.lastName}, ${address.address}, ${address.city}`;
    }
    if (address.street) {
      return `${address.street}, ${address.city}, ${address.postcode}`;
    }
    return 'Address information unavailable';
  };

  const getProductCount = (order: Order) => {
    return order.order_items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setIsUpdateStatusOpen(true);
  };

  return (
    <div>
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Kei Bstellige</h3>
          <p className="mt-1 text-sm text-gray-500">
            {status === 'all' ? 'Es git no kei Bstellige.' : 'Es git kei Bstellige mit dem Status.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Bstellnr.</TableHead>
                <TableHead><Calendar size={14} className="mr-1 inline" /> Datum</TableHead>
                <TableHead><User size={14} className="mr-1 inline" /> Chund</TableHead>
                <TableHead><Package size={14} className="mr-1 inline" /> Produkt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Aktione</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{formatAddress(order.delivery_address)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {getProductCount(order)} Artikel
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{statusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">CHF {formatCurrency(order.total_amount)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye size={14} className="mr-1" /> Details
                      </Button>
                      {order.status !== 'delivered' && (
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-brings-primary hover:bg-brings-primary/90"
                          onClick={() => handleUpdateStatus(order)}
                        >
                          <Truck size={14} className="mr-1" /> Status ändere
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedOrder && (
        <>
          <OrderDetails 
            order={selectedOrder} 
            isOpen={isDetailsOpen} 
            onClose={() => setIsDetailsOpen(false)} 
          />
          
          <UpdateOrderStatus 
            order={selectedOrder} 
            isOpen={isUpdateStatusOpen} 
            onClose={() => setIsUpdateStatusOpen(false)} 
          />
        </>
      )}
    </div>
  );
};

export default OrderTrackingList;
