
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderTrackingList from '@/components/admin/OrderTrackingList';
import { Loader2 } from 'lucide-react';

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
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-brings-primary mb-4" />
            <p className="text-gray-600">Bstellige lade...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
            <p>Fehler bim Lade vo de Bstellige. Bitte versucheds spöter nomal.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Bstellig Tracking</h1>
        
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
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrderTracking;
