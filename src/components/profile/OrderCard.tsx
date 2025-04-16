
import React from 'react';
import { Order } from '@/types/order';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock, Truck, CheckCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/format-utils';

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock size={14} className="mr-1" /> Offe</Badge>;
      case 'in_delivery':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Truck size={14} className="mr-1" /> In Lieferig</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle size={14} className="mr-1" /> Abgschlosse</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getOrderSummary = (order: Order) => {
    const totalItems = order.order_items.reduce((sum, item) => sum + item.quantity, 0);
    const itemText = totalItems === 1 ? 'item' : 'items';
    return `${totalItems} ${itemText}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-500">Order placed</div>
          <div className="font-medium">{formatDate(order.created_at)}</div>
        </div>
        {getStatusBadge(order.status)}
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Package className="text-gray-400 mr-2" size={18} />
          <span className="text-gray-700">{getOrderSummary(order)}</span>
        </div>
        
        <div className="space-y-3">
          {order.order_items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex-1">
                <span className="font-medium">{item.quantity}x</span> {item.product_name}
              </div>
              <div className="text-right">
                CHF {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
          
          {order.order_items.length > 3 && (
            <div className="text-sm text-gray-500">
              +{order.order_items.length - 3} more items
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <div>
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-bold">CHF {formatCurrency(order.total_amount)}</div>
          </div>
          
          <Link to={`/order-tracking/${order.id}`}>
            <Button variant="outline" size="sm" className="flex items-center">
              Track Order <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
