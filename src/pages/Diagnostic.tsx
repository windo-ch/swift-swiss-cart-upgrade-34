import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '@/services/productService';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabaseProductsToAppProducts } from '@/utils/product-adapter';

const Diagnostic = () => {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [localStorageProducts, setLocalStorageProducts] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();
  
  // Fetch products from Supabase
  const { data: supabaseProducts = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Get products from localStorage
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('adminProducts');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        setLocalStorageProducts(parsedProducts);
      }
    } catch (error) {
      console.error('Error loading localStorage products:', error);
      setLocalStorageProducts([]);
    }
  }, [syncStatus]);
  
  // Function to sync products from Supabase to localStorage
  const syncProductsToLocalStorage = async () => {
    setSyncStatus('loading');
    setMessage('');
    
    try {
      if (!Array.isArray(supabaseProducts) || supabaseProducts.length === 0) {
        throw new Error('No products found in Supabase');
      }
      
      // Convert Supabase products to the format expected by localStorage using the adapter
      const adminProducts = supabaseProductsToAppProducts(supabaseProducts);
      
      // Store in localStorage
      localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
      
      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      setSyncStatus('success');
      setMessage(`Successfully synchronized ${adminProducts.length} products to localStorage`);
    } catch (error) {
      console.error('Error syncing products:', error);
      setSyncStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };
  
  // Function to clear localStorage products
  const clearLocalStorageProducts = () => {
    try {
      localStorage.removeItem('adminProducts');
      window.dispatchEvent(new Event('storage'));
      setSyncStatus('idle');
      setMessage('Cleared products from localStorage');
      setLocalStorageProducts([]);
    } catch (error) {
      console.error('Error clearing localStorage products:', error);
      setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };
  
  // Check Supabase connection
  const checkSupabaseConnection = async () => {
    setSyncStatus('loading');
    setMessage('');
    
    try {
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        throw error;
      }
      
      setSyncStatus('success');
      setMessage(`Supabase connection successful. Found ${count} products.`);
    } catch (error) {
      console.error('Error checking Supabase connection:', error);
      setSyncStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };
  
  // Refresh data
  const refreshData = async () => {
    setSyncStatus('loading');
    setMessage('Refreshing data...');
    
    try {
      await refetch();
      setSyncStatus('success');
      setMessage('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing data:', error);
      setSyncStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };
  
  const compareProductsWithSupabase = async () => {
    setSyncStatus('loading');
    setMessage('Comparing products...');
    
    try {
      // Fetch products from Supabase
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      
      // Convert to app format using the proper adapter
      const supabaseFormattedProducts = supabaseProductsToAppProducts(data);
      
      // Get localStorage products
      const storedProducts = localStorage.getItem('adminProducts');
      let localStorageProducts: any[] = [];
      if (storedProducts) {
        try {
          localStorageProducts = JSON.parse(storedProducts);
        } catch (error) {
          throw new Error('Error parsing products from localStorage');
        }
      }
      
      // Compare products
      const localProductsMap = new Map(localStorageProducts.map(p => [p.id, p]));
      const supabaseProductsMap = new Map(supabaseFormattedProducts.map(p => [p.id, p]));
      
      let mismatches = 0;
      let details = '';
      
      // Check for products in localStorage but not in Supabase
      for (const [id, product] of localProductsMap) {
        if (!supabaseProductsMap.has(id)) {
          mismatches++;
          details += `Product in localStorage but not in Supabase: ID ${id} - ${product.name}\n`;
        }
      }
      
      // Check for products in Supabase but not in localStorage
      for (const [id, product] of supabaseProductsMap) {
        if (!localProductsMap.has(id)) {
          mismatches++;
          details += `Product in Supabase but not in localStorage: ID ${id} - ${product.name}\n`;
        }
      }
      
      // Check for products with different data
      for (const [id, localProduct] of localProductsMap) {
        const supabaseProduct = supabaseProductsMap.get(id);
        if (supabaseProduct) {
          // Compare relevant fields
          const fieldsToCompare = ['name', 'price', 'category', 'description', 'image', 'stock'];
          for (const field of fieldsToCompare) {
            if (JSON.stringify(localProduct[field]) !== JSON.stringify(supabaseProduct[field])) {
              mismatches++;
              details += `Mismatch in product ID ${id} - ${localProduct.name}: field "${field}" differs\n`;
              details += `  localStorage: ${JSON.stringify(localProduct[field])}\n`;
              details += `  Supabase: ${JSON.stringify(supabaseProduct[field])}\n`;
              break; // Only count one mismatch per product
            }
          }
        }
      }
      
      const differences = findDifferences(supabaseFormattedProducts, localStorageProducts);
      
      if (differences.length === 0) {
        setSyncStatus('success');
        setMessage('Products are in sync! No differences found.');
      } else {
        setSyncStatus('error');
        setMessage(`Comparison complete. Found ${differences.length} differences.`);
        setDifferences(differences);
      }
    } catch (error) {
      console.error('Error comparing products:', error);
      setSyncStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">System Diagnostic</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Status</CardTitle>
              <CardDescription>Check connection to Supabase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="mr-2 h-4 w-4">
                  {isError ? (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ) : isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin text-yellow-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div>
                  {isError ? 'Connection failed' : isLoading ? 'Checking connection...' : 'Connected to Supabase'}
                </div>
              </div>
              
              <p className="mb-2">
                Products in Supabase: <Badge>{supabaseProducts?.length || 0}</Badge>
              </p>
              
              <div className="space-x-2">
                <Button onClick={checkSupabaseConnection} variant="outline" size="sm">
                  Test Connection
                </Button>
                <Button onClick={refreshData} variant="outline" size="sm">
                  Refresh Data
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>LocalStorage Status</CardTitle>
              <CardDescription>Manage products in browser storage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                Products in localStorage: <Badge>{localStorageProducts?.length || 0}</Badge>
              </p>
              
              <div className="space-x-2">
                <Button onClick={syncProductsToLocalStorage} variant="outline" size="sm">
                  Sync DB Products to localStorage
                </Button>
                <Button onClick={clearLocalStorageProducts} variant="outline" size="sm" className="mt-2 sm:mt-0">
                  Clear localStorage Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Diagnostic Information</CardTitle>
            <CardDescription>Details about your system configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Supabase Connection</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  URL: {import.meta.env.VITE_SUPABASE_URL ? '[Configured]' : '[Not configured]'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  API Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '[Configured]' : '[Not configured]'}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium">System Status</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Status: {syncStatus === 'idle' ? 'Ready' : syncStatus === 'loading' ? 'Processing...' : syncStatus === 'success' ? 'Success' : 'Error'}
                </p>
                {message && (
                  <p className={`text-sm mt-1 ${syncStatus === 'error' ? 'text-red-500' : syncStatus === 'success' ? 'text-green-500' : 'text-gray-500'}`}>
                    {message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs text-gray-500">
              This page is only for diagnostic purposes. Any changes made here may affect the system.
            </p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Product Comparison</CardTitle>
            <CardDescription>Compare products between Supabase and localStorage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-x-2">
              <Button onClick={compareProductsWithSupabase} variant="outline" size="sm">
                Compare with Supabase
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Diagnostic; 