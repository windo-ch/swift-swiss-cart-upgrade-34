import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSupabaseDiagnostics } from '@/utils/supabase-diagnostic';
import { forceInitializeProducts } from '@/utils/force-product-init';
import { initializeImageStorage, uploadPlaceholderImage } from '@/utils/image-storage-init';
import { Separator } from '@/components/ui/separator';

const DatabaseDiagnosticPage = () => {
  const [loading, setLoading] = useState(false);
  const [diagnosticReport, setDiagnosticReport] = useState<string>('');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [initResult, setInitResult] = useState<{
    success?: boolean;
    message?: string;
    productCount?: number;
  }>({});
  const [isInitializing, setIsInitializing] = useState(false);
  const [imageStorageResult, setImageStorageResult] = useState<{
    success?: boolean;
    message?: string;
    url?: string;
  }>({});
  const [isInitializingStorage, setIsInitializingStorage] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    try {
      const report = await getSupabaseDiagnostics();
      setDiagnosticReport(report);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error running diagnostics:', error);
      setDiagnosticReport(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForceInitProducts = async () => {
    if (window.confirm('This will delete all existing products in Supabase and recreate them. Are you sure?')) {
      setIsInitializing(true);
      try {
        const result = await forceInitializeProducts();
        setInitResult(result);
        
        // Refresh diagnostics after initialization
        await runDiagnostics();
      } catch (error) {
        console.error('Error initializing products:', error);
        setInitResult({
          success: false,
          message: `Error: ${error instanceof Error ? error.message : String(error)}`,
          productCount: 0
        });
      } finally {
        setIsInitializing(false);
      }
    }
  };

  const handleInitializeImageStorage = async () => {
    setIsInitializingStorage(true);
    try {
      // First initialize the bucket
      const bucketResult = await initializeImageStorage();
      
      if (!bucketResult.success) {
        setImageStorageResult({
          success: false,
          message: bucketResult.message
        });
        return;
      }
      
      // Then upload the placeholder image
      const placeholderResult = await uploadPlaceholderImage();
      setImageStorageResult(placeholderResult);
      
      // Refresh diagnostics after initialization
      await runDiagnostics();
    } catch (error) {
      console.error('Error initializing image storage:', error);
      setImageStorageResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : String(error)}`
      });
    } finally {
      setIsInitializingStorage(false);
    }
  };

  useEffect(() => {
    // Run diagnostics when the page loads
    runDiagnostics();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Database Diagnostic</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Supabase Connection Diagnostics
              {lastChecked && (
                <Badge variant="outline" className="text-xs">
                  Last checked: {lastChecked.toLocaleTimeString()}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Check if the Supabase connection is working correctly and diagnose any issues with product data.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-md mb-4 font-mono text-sm whitespace-pre-wrap">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500 mr-2" />
                  <span>Running diagnostics...</span>
                </div>
              ) : diagnosticReport ? (
                diagnosticReport
              ) : (
                'No diagnostic information available.'
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={runDiagnostics}
              disabled={loading}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                'Run Diagnostics Again'
              )}
            </Button>
            
            <Button 
              onClick={handleForceInitProducts}
              disabled={isInitializing || loading}
              variant="destructive"
              className="w-full sm:w-auto"
            >
              {isInitializing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing Products...
                </>
              ) : (
                'Force Initialize Products'
              )}
            </Button>
            
            <Button 
              onClick={handleInitializeImageStorage}
              disabled={isInitializingStorage || loading}
              variant="default"
              className="w-full sm:w-auto"
            >
              {isInitializingStorage ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing Storage...
                </>
              ) : (
                'Initialize Image Storage'
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {initResult.message && (
          <Alert variant={initResult.success ? "default" : "destructive"} className="mb-4">
            {initResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <AlertTitle>Product Initialization {initResult.success ? "Successful" : "Failed"}</AlertTitle>
            <AlertDescription>
              {initResult.message}
              {initResult.productCount !== undefined && initResult.productCount > 0 && (
                <p className="mt-2">Successfully initialized {initResult.productCount} products.</p>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        {imageStorageResult.message && (
          <Alert variant={imageStorageResult.success ? "default" : "destructive"} className="mb-8">
            {imageStorageResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <AlertTitle>Image Storage {imageStorageResult.success ? "Initialized" : "Initialization Failed"}</AlertTitle>
            <AlertDescription>
              {imageStorageResult.message}
              {imageStorageResult.url && (
                <div className="mt-2">
                  <p>Placeholder image URL:</p>
                  <div className="bg-gray-50 p-2 mt-1 rounded-md font-mono text-xs break-all">
                    {imageStorageResult.url}
                  </div>
                  <div className="mt-2">
                    <p>Preview:</p>
                    <img 
                      src={imageStorageResult.url}
                      alt="Placeholder"
                      className="mt-1 w-16 h-16 border border-gray-200 rounded-md object-contain"
                    />
                  </div>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        <Separator className="my-8" />
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Common Issues & Solutions</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Products Table Missing or Empty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  If the products table is missing or empty, you may need to execute the SQL scripts in the SQL Editor of the Supabase Dashboard.
                  Check the <code>src/sql/create_products_table.sql</code> file for the correct schema.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Product Images Not Loading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  If product images are not loading, ensure the 'product-images' storage bucket exists in Supabase and is set to public.
                  Use the "Initialize Image Storage" button to fix bucket permissions and ensure the placeholder image exists.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DatabaseDiagnosticPage; 