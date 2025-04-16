import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  Image
} from 'lucide-react';
import { formatCurrency } from '@/utils/format-utils';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  delivery_fee: number;
  discount_amount: number;
  delivery_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    email: string;
    phone: string;
  };
  order_items: Array<{
    id: string;
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }>;
  delivery_photo?: string;
  marketing_consent?: boolean;
}

interface OrderDetailsProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
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

  const calculateSubtotal = () => {
    return order.order_items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Bstellig #{order.id.slice(0, 8)}</span>
            {statusBadge(order.status)}
          </DialogTitle>
          <DialogDescription className="flex items-center">
            <Calendar size={14} className="mr-1" /> 
            Bestellt am {formatDate(order.created_at)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Liefer Adresse</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium">{order.delivery_address.firstName} {order.delivery_address.lastName}</p>
                <p className="flex items-center"><MapPin size={14} className="mr-1" /> {order.delivery_address.address}, {order.delivery_address.postalCode} {order.delivery_address.city}</p>
                <p className="flex items-center"><Phone size={14} className="mr-1" /> {order.delivery_address.phone}</p>
                <p className="flex items-center"><Mail size={14} className="mr-1" /> {order.delivery_address.email}</p>
              </div>
            </div>

            {order.status === 'delivered' && order.delivery_photo && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Lieferfoto</h3>
                <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={order.delivery_photo} 
                    alt="Lieferfoto" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Image size={12} className="mr-1" />
                  {order.marketing_consent 
                    ? 'Chund het Verwendig für Marketing erlaubt' 
                    : 'Chund het Verwendig für Marketing nöd erlaubt'}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Bestellt Artikel</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <ul className="divide-y divide-gray-200">
                {order.order_items.map((item) => (
                  <li key={item.id} className="py-2 first:pt-0 last:pb-0">
                    <div className="flex justify-between">
                      <span className="flex-1">
                        {item.quantity}x {item.product_name}
                      </span>
                      <span className="text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Zwischesumme</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Liefergibühr</span>
                  <span>{formatCurrency(order.delivery_fee || 0)}</span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-sm mt-1 text-green-600">
                    <span>Rabatt</span>
                    <span>- {formatCurrency(order.discount_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatCurrency(order.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Schliesse</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
