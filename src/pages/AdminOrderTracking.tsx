
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderTrackingList from '@/components/admin/OrderTrackingList';
import { Loader2 } from 'lucide-react';
import { Order, OrderAddress } from '@/types/order';

const AdminOrderTracking = () => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Transform the data to match our Order type
      return data.map((order: any): Order => {
        let deliveryAddress: OrderAddress;
        
        if (typeof order.delivery_address === 'string') {
          try {
            deliveryAddress = JSON.parse(order.delivery_address);
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
          deliveryAddress = order.delivery_address as OrderAddress;
        }
        
        return {
          id: order.id,
          user_id: order.user_id,
          total_amount: order.total_amount,
          delivery_fee: order.delivery_fee || 0,
          discount_amount: order.discount_amount || 0,
          delivery_address: deliveryAddress,
          status: order.status,
          created_at: order.created_at,
          updated_at: order.updated_at,
          payment_method: order.payment_method,
          estimated_delivery_time: order.estimated_delivery_time,
          order_items: order.order_items || [],
          delivery_photo: order.delivery_photo,
          marketing_consent: order.marketing_consent
        };
      });
    }
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-brings-primary mb-4" />
            <p className="text-gray-600">Bstellige lade...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
          <p>Fehler bim Lade vo de Bstellige. Bitte versucheds spöter nomal.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Offe</TabsTrigger>
          <TabsTrigger value="in_delivery">In Lieferig</TabsTrigger>
          <TabsTrigger value="delivered">Abgschlossen</TabsTrigger>
          <TabsTrigger value="all">Alli</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <OrderTrackingList 
            orders={orders?.filter(order => order.status === 'pending') || []} 
            status="pending"
          />
        </TabsContent>
        
        <TabsContent value="in_delivery">
          <OrderTrackingList 
            orders={orders?.filter(order => order.status === 'in_delivery') || []} 
            status="in_delivery"
          />
        </TabsContent>
        
        <TabsContent value="delivered">
          <OrderTrackingList 
            orders={orders?.filter(order => order.status === 'delivered') || []} 
            status="delivered"
          />
        </TabsContent>
        
        <TabsContent value="all">
          <OrderTrackingList orders={orders || []} status="all" />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminOrderTracking;
