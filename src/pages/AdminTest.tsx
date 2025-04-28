import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const AdminTest = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [localStorageProducts, setLocalStorageProducts] = useState<any[]>([]);

  // Test direct Supabase fetch
  const fetchProductsDirectly = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Testing direct Supabase products fetch...");
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(5);
      
      if (error) {
        throw error;
      }
      
      setProducts(data || []);
      console.log("Successfully fetched products:", data?.length);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // Test localStorage products
  const checkLocalStorageProducts = () => {
    try {
      const stored = localStorage.getItem('adminProducts');
      if (stored) {
        const parsedProducts = JSON.parse(stored);
        setLocalStorageProducts(Array.isArray(parsedProducts) ? parsedProducts : []);
      } else {
        setLocalStorageProducts([]);
      }
    } catch (err) {
      console.error("Error checking localStorage:", err);
    }
  };

  useEffect(() => {
    // Initial check
    fetchProductsDirectly();
    checkLocalStorageProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Supabase Products Test
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchProductsDirectly} 
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Refresh'
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Loading products...</span>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <div className="flex items-center text-red-700 mb-2">
                  <XCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Error fetching products</span>
                </div>
                <pre className="text-sm text-red-600 whitespace-pre-wrap">{error}</pre>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                <div className="flex items-center text-yellow-700">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>No products found in Supabase</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center text-green-700 mb-4">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Successfully loaded {products.length} products</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Category</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="px-4 py-2">{product.id}</td>
                          <td className="px-4 py-2">{product.name}</td>
                          <td className="px-4 py-2">{product.price}</td>
                          <td className="px-4 py-2">{product.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              LocalStorage Products Test
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkLocalStorageProducts}
              >
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {localStorageProducts.length === 0 ? (
              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                <div className="flex items-center text-yellow-700">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>No products found in localStorage</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center text-green-700 mb-4">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Found {localStorageProducts.length} products in localStorage</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Category</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {localStorageProducts.slice(0, 5).map(product => (
                        <tr key={product.id}>
                          <td className="px-4 py-2">{product.id}</td>
                          <td className="px-4 py-2">{product.name}</td>
                          <td className="px-4 py-2">{product.price}</td>
                          <td className="px-4 py-2">{product.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {localStorageProducts.length > 5 && (
                    <p className="text-xs text-gray-500 mt-2">
                      Showing 5 of {localStorageProducts.length} products
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin Access Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a 
                href="/admin-super-direct" 
                className="px-4 py-2 bg-brings-primary text-white rounded-md hover:bg-brings-primary-dark text-center"
              >
                Super Direct Dashboard
              </a>
              <a 
                href="/admin-dashboard-direct" 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
              >
                Direct Dashboard
              </a>
              <a 
                href="/admin-minimal" 
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-center"
              >
                Minimal Dashboard
              </a>
              <a 
                href="/order-test" 
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 text-center"
              >
                Order Test Page
              </a>
              <a 
                href="/admin" 
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-center"
              >
                Normal Admin
              </a>
              <a 
                href="/db-diagnostic" 
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 text-center"
              >
                Database Diagnostic
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <span className="font-medium">Check Supabase connectivity</span>
                <p className="text-sm text-gray-600 ml-6">Verify that Supabase is successfully returning products.</p>
              </li>
              <li>
                <span className="font-medium">Verify localStorage sync</span>
                <p className="text-sm text-gray-600 ml-6">Ensure products are being properly synced to localStorage.</p>
              </li>
              <li>
                <span className="font-medium">Check Admin Dashboard code</span>
                <p className="text-sm text-gray-600 ml-6">The admin dashboard may not be correctly handling async product loading.</p>
              </li>
              <li>
                <span className="font-medium">Test special direct access route</span>
                <p className="text-sm text-gray-600 ml-6">
                  Try accessing <a href="/admin-super-direct" className="text-brings-primary underline">
                    admin-super-direct
                  </a> which uses minimal providers.
                </p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminTest; 