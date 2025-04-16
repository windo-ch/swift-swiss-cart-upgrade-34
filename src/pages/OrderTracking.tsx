
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Home,
  Calendar, 
  CreditCard,
  MapPin,
  User,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/order';
import { formatCurrency } from '@/utils/format-utils';

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        // Transform the order data to match our Order type
        let deliveryAddress;
        if (typeof data.delivery_address === 'string') {
          try {
            deliveryAddress = JSON.parse(data.delivery_address);
          } catch (e) {
            deliveryAddress = {
              firstName: 'Unknown',
              lastName: 'Customer',
              address: 'Unknown',
              city: 'Unknown',
              postalCode: 'Unknown',
              email: 'unknown@example.com',
              phone: 'Unknown'
            };
          }
        } else {
          deliveryAddress = data.delivery_address;
        }
        
        const transformedOrder: Order = {
          id: data.id,
          user_id: data.user_id,
          total_amount: data.total_amount,
          delivery_fee: data.delivery_fee || 0,
          discount_amount: data.discount_amount || 0,
          delivery_address: deliveryAddress,
          status: data.status,
          created_at: data.created_at,
          updated_at: data.updated_at,
          payment_method: data.payment_method,
          estimated_delivery_time: data.estimated_delivery_time,
          order_items: data.order_items || [],
          delivery_photo: data.delivery_photo,
          marketing_consent: data.marketing_consent
        };
        
        setOrder(transformedOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not load the order. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrder();
  }, [id, toast]);

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

  const getTrackingStepStatus = (orderStatus: string, step: 'ordered' | 'processing' | 'shipping' | 'delivered') => {
    if (step === 'ordered') return 'completed';
    
    if (step === 'processing') {
      return orderStatus === 'pending' ? 'current' : 'completed';
    }
    
    if (step === 'shipping') {
      return orderStatus === 'in_delivery' ? 'current' : 
             orderStatus === 'delivered' ? 'completed' : 
             'upcoming';
    }
    
    if (step === 'delivered') {
      return orderStatus === 'delivered' ? 'completed' : 'upcoming';
    }
    
    return 'upcoming';
  };

  const calculateSubtotal = (order: Order) => {
    return order.order_items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-brings-primary mb-4" />
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
          <Link to="/profile">
            <Button>Go to My Orders</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-8">
          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Link to="/profile" className="hover:text-brings-primary flex items-center">
                <Home size={16} />
                <span className="ml-1">My Account</span>
              </Link>
              <span>/</span>
              <span>Order #{order.id.slice(0, 8)}</span>
            </div>
            <h1 className="text-2xl font-bold">Track Your Order</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="text-right">
              <div className="text-sm text-gray-500">Order Date</div>
              <div className="font-medium">{formatDate(order.created_at)}</div>
            </div>
          </div>
        </div>

        {/* Tracking Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-6">Order Status</h2>
          
          <div className="relative">
            {/* Progress bar */}
            <div className="hidden sm:block absolute left-0 top-10 w-full h-1 bg-gray-200 z-0">
              <div 
                className="h-full bg-brings-primary" 
                style={{ 
                  width: order.status === 'pending' ? '25%' : 
                         order.status === 'in_delivery' ? '75%' : 
                         order.status === 'delivered' ? '100%' : '0%' 
                }}
              ></div>
            </div>
            
            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {/* Step 1: Ordered */}
              <div className="relative">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full z-10
                  ${getTrackingStepStatus(order.status, 'ordered') === 'completed' ? 
                    'bg-brings-primary text-white' : 'bg-gray-200 text-gray-500'}
                  mx-auto sm:mx-0
                `}>
                  <Clock size={20} />
                </div>
                <div className="mt-3 sm:mt-6">
                  <h3 className="font-medium">Order Placed</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>
              
              {/* Step 2: Processing */}
              <div className="relative">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full z-10
                  ${getTrackingStepStatus(order.status, 'processing') === 'completed' ? 
                    'bg-brings-primary text-white' : 
                    getTrackingStepStatus(order.status, 'processing') === 'current' ? 
                    'bg-brings-primary text-white ring-4 ring-brings-primary/20' : 
                    'bg-gray-200 text-gray-500'}
                  mx-auto sm:mx-0
                `}>
                  <Package size={20} />
                </div>
                <div className="mt-3 sm:mt-6">
                  <h3 className="font-medium">Processing</h3>
                  <p className="text-sm text-gray-500">
                    {order.status === 'pending' ? 'In progress' : 'Completed'}
                  </p>
                </div>
              </div>
              
              {/* Step 3: Shipping */}
              <div className="relative">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full z-10
                  ${getTrackingStepStatus(order.status, 'shipping') === 'completed' ? 
                    'bg-brings-primary text-white' : 
                    getTrackingStepStatus(order.status, 'shipping') === 'current' ? 
                    'bg-brings-primary text-white ring-4 ring-brings-primary/20' : 
                    'bg-gray-200 text-gray-500'}
                  mx-auto sm:mx-0
                `}>
                  <Truck size={20} />
                </div>
                <div className="mt-3 sm:mt-6">
                  <h3 className="font-medium">On the Way</h3>
                  <p className="text-sm text-gray-500">
                    {order.status === 'in_delivery' ? 
                      'Your order is on the way' : 
                      order.status === 'delivered' ? 
                      'Completed' : 'Waiting'}
                  </p>
                </div>
              </div>
              
              {/* Step 4: Delivered */}
              <div className="relative">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full z-10
                  ${getTrackingStepStatus(order.status, 'delivered') === 'completed' ? 
                    'bg-brings-primary text-white' : 
                    'bg-gray-200 text-gray-500'}
                  mx-auto sm:mx-0
                `}>
                  <CheckCircle size={20} />
                </div>
                <div className="mt-3 sm:mt-6">
                  <h3 className="font-medium">Delivered</h3>
                  <p className="text-sm text-gray-500">
                    {order.status === 'delivered' ? 
                      'Your order has been delivered' : 
                      'Waiting for delivery'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Estimated delivery time */}
          {order.estimated_delivery_time && order.status !== 'delivered' && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-brings-primary mr-2" />
                <p className="text-sm">
                  <span className="font-medium">Estimated Delivery:</span> {formatDate(order.estimated_delivery_time)}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Order details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="divide-y divide-gray-200">
                {order.order_items.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between">
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">CHF {formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>CHF {formatCurrency(calculateSubtotal(order))}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Delivery Fee</span>
                  <span>CHF {formatCurrency(order.delivery_fee)}</span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-sm mt-2 text-green-600">
                    <span>Discount</span>
                    <span>-CHF {formatCurrency(order.discount_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">CHF {formatCurrency(order.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order info */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* Shipping info */}
              <div>
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> Shipping Information
                </h3>
                <div className="text-sm">
                  <p className="font-medium">{order.delivery_address.firstName} {order.delivery_address.lastName}</p>
                  <p>{order.delivery_address.address}</p>
                  <p>{order.delivery_address.postalCode} {order.delivery_address.city}</p>
                  <p className="mt-2">{order.delivery_address.phone}</p>
                  <p>{order.delivery_address.email}</p>
                </div>
              </div>
              
              {/* Payment info */}
              <div>
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <CreditCard className="h-4 w-4 mr-1" /> Payment Information
                </h3>
                <div className="text-sm">
                  <p className="capitalize">{order.payment_method.replace('_', ' ')}</p>
                </div>
              </div>
              
              {/* Need help */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-md font-semibold mb-2">Need Help?</h3>
                <Button className="w-full" variant="outline">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;
