
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
  Image,
  Package
} from 'lucide-react';
import { formatCurrency } from '@/utils/format-utils';
import { Order } from '@/types/order';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface OrderDetailsProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetails = ({ order, isOpen, onClose }: OrderDetailsProps) => {
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

  const getProductImageUrl = (product_id: string) => {
    // Default placeholder image
    return 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
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
                <div className="relative bg-gray-100 rounded-md overflow-hidden">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={order.delivery_photo} 
                      alt="Lieferfoto" 
                      className="w-full h-full object-cover" 
                    />
                  </AspectRatio>
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
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 rounded-md">
                        <AvatarImage src={getProductImageUrl(item.product_id)} alt={item.product_name} />
                        <AvatarFallback className="rounded-md">
                          <Package size={14} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.quantity}x {item.product_name}</p>
                        <p className="text-xs text-gray-500">ID: {item.product_id.slice(0, 8)}</p>
                      </div>
                      <div className="text-right text-sm font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
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
