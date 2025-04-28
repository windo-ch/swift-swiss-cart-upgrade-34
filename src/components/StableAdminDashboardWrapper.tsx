import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminProvider } from '@/contexts/AdminContext';
import { AuthProvider } from '@/contexts/AuthContext';
import AdminDashboard from '@/pages/AdminDashboard';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

// Create a stable query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const StableAdminDashboardWrapper = () => {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [supabaseCount, setSupabaseCount] = useState(0);

  // Check Supabase connection first
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        console.log("🔌 Testing Supabase connection...");
        
        // Try to fetch products count
        const { count, error } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          throw error;
        }
        
        setSupabaseCount(count || 0);
        console.log(`✅ Supabase connection successful. Found ${count} products.`);
        
        // Force enable debug mode
        localStorage.setItem('adminDebugMode', 'true');
        
        setStatus('success');
      } catch (error) {
        console.error("❌ Supabase connection failed:", error);
        setErrorMessage(error instanceof Error ? error.message : String(error));
        setStatus('error');
      }
    };
    
    testSupabaseConnection();
  }, []);

  // Render different content based on status
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 text-brings-primary animate-spin mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verbindung zum Datenbank wird hergestellt...</h2>
            <p className="text-gray-600">Bitte warten Sie einen Moment.</p>
          </div>
        );
      
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verbindungsproblem</h2>
            <p className="text-gray-600 mb-4">Es konnte keine Verbindung zur Datenbank hergestellt werden.</p>
            {errorMessage && (
              <div className="bg-red-50 p-4 rounded-md border border-red-200 max-w-md text-center">
                <p className="text-red-700 font-medium mb-2">Fehlermeldung:</p>
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
            )}
            <button 
              className="mt-6 px-4 py-2 bg-brings-primary text-white rounded-md hover:bg-brings-primary-dark"
              onClick={() => window.location.reload()}
            >
              Erneut versuchen
            </button>
          </div>
        );
      
      case 'success':
        return (
          <div className="py-4 px-6 bg-green-50 border border-green-200 rounded-lg mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-medium text-green-800">Supabase Verbindung erfolgreich</h3>
            </div>
            <p className="text-sm text-green-600 mt-1">
              {supabaseCount} Produkte in der Datenbank gefunden.
            </p>
            
            <div className="mt-4">
              <AdminDashboard />
            </div>
          </div>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminProvider>
          {renderContent()}
        </AdminProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default StableAdminDashboardWrapper; 