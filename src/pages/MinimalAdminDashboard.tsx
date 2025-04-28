import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertTriangle, Package, TrendingUp } from 'lucide-react';

const MinimalAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Directly fetch data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('MinimalAdminDashboard: Fetching data directly from Supabase...');
        
        // Force debug mode on
        try {
          localStorage.setItem('adminDebugMode', 'true');
        } catch (e) {
          console.error('Failed to set debug mode:', e);
        }

        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .limit(5);
        
        if (productsError) throw productsError;
        setProducts(productsData || []);
        
        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .limit(5);
        
        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 text-brings-primary animate-spin mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loading Admin Dashboard</h2>
          <p className="text-gray-600">Please wait while we fetch the data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-bold text-red-700">Error Loading Dashboard</h2>
          </div>
          <p className="text-red-600 mb-4">There was an error loading the admin dashboard:</p>
          <pre className="bg-red-100 p-3 rounded text-red-800 text-sm overflow-x-auto">{error}</pre>
          
          <div className="mt-6 flex gap-3">
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
            <a href="/admin-test" className="px-4 py-2 bg-brings-primary text-white rounded-md inline-block">
              Go to Admin Test
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="font-medium text-green-800">
            Minimal Admin Dashboard Loaded Successfully
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Minimal Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-brings-primary" />
              Products ({products.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-gray-500">No products found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map(product => (
                      <tr key={product.id}>
                        <td className="px-4 py-2">{product.id}</td>
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-brings-primary" />
              Orders ({orders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="px-4 py-2">{order.id}</td>
                        <td className="px-4 py-2">{order.status}</td>
                        <td className="px-4 py-2">{order.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center gap-4">
        <a href="/admin-test" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
          Back to Test Page
        </a>
        <a href="/" className="px-4 py-2 bg-brings-primary text-white rounded-md">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default MinimalAdminDashboard; 