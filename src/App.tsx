import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Dateschutz from "./pages/Dateschutz";
import AGB from "./pages/AGB";
import Impressum from "./pages/Impressum";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Admin from "./pages/Admin";
import AdminOrderTracking from "./pages/AdminOrderTracking";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import OrderTracking from "./pages/OrderTracking";
import Shipping from "./pages/Shipping";
import FAQ from "./pages/FAQ";
import AdminTroubleshooting from "./pages/AdminTroubleshooting";
import DirectAdminAccess from "./pages/DirectAdminAccess";
import { AuthProvider } from "./contexts/AuthContext";
import { AgeVerificationProvider } from "./contexts/AgeVerificationContext";
import { CartProvider } from "./contexts/CartContext";
import { DistrictProvider } from "./contexts/DistrictContext";
import InitialLoadingScreen from "./components/InitialLoadingScreen";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import FirstTimeUserBanner from "./components/FirstTimeUserBanner";
import InitialFlowHandler from "./components/InitialFlowHandler";
import AdminRoute from "./components/admin/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import DatabaseDiagnostic from "@/pages/DatabaseDiagnostic";
import Diagnostic from './pages/Diagnostic';
import AdminTest from './pages/AdminTest';
import MinimalAdminDashboard from './pages/MinimalAdminDashboard';
import React, { useEffect, useState } from "react";
import { AdminProvider } from "./contexts/AdminContext";
import StableAdminDashboardWrapper from './components/StableAdminDashboardWrapper';
import OrderTestPage from './pages/OrderTestPage';

const queryClient = new QueryClient();

// Simple error boundary component
class MyErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("🚨 Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Create a special route that renders the admin dashboard
// outside all providers that might cause redirects
const SuperBypassAdminDashboard = () => {
  console.log("🔴 SuperBypassAdminDashboard - Component mounting");
  
  // Keep track of render count to help with debugging
  const [renderCount, setRenderCount] = useState(0);
  
  // Add an error boundary to catch and handle any errors
  useEffect(() => {
    console.log("🔴 SuperBypassAdminDashboard - Effect running", { renderCount });
    
    // Force enable debug mode for admin dashboard
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('adminDebugMode', 'true');
        console.log("🔴 SuperBypassAdminDashboard - Debug mode set to true");
      } catch (e) {
        console.error("🔴 Failed to set debug mode:", e);
      }
    }
    
    // Increment render count to track re-renders
    setRenderCount(prev => prev + 1);
    
    return () => {
      console.log("🔴 SuperBypassAdminDashboard - Unmounting");
    };
  }, [renderCount]);
  
  return (
    <MyErrorBoundary fallback={
      <div className="p-6 bg-red-50 border border-red-300 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">Error Rendering Admin Dashboard</h2>
        <p className="text-red-700 mb-4">There was an error while trying to render the admin dashboard.</p>
        <div className="flex gap-2">
          <a 
            href="/admin-test" 
            className="px-3 py-2 bg-brings-primary text-white rounded-md hover:bg-brings-primary-dark"
          >
            Go to Admin Test Page
          </a>
          <button 
            onClick={() => window.location.reload()} 
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Refresh Page
          </button>
        </div>
      </div>
    }>
      <QueryClientProvider client={new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: Infinity
          }
        }
      })}>
        <AuthProvider>
          <AdminProvider>
            <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg mb-4">
              <h2 className="text-lg font-bold text-yellow-800">Direct Admin Dashboard Access</h2>
              <p className="text-sm text-yellow-700">
                Using minimal providers to bypass potential issues. Check the console for debugging information.
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Render count: {renderCount}
              </p>
            </div>
            <AdminDashboard />
          </AdminProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MyErrorBoundary>
  );
};

// Absolute minimal test component - no dependencies at all
const MinimalTestPage = () => {
  useEffect(() => {
    console.log("🔴 TestAdminPage mounted");
    
    // Log if any redirect attempts happen
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function() {
      console.log("🔴 history.pushState called with", arguments);
      return originalPushState.apply(this, arguments);
    };
    
    window.history.replaceState = function() {
      console.log("🔴 history.replaceState called with", arguments);
      return originalReplaceState.apply(this, arguments);
    };
    
    return () => {
      console.log("🔴 TestAdminPage unmounting");
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);
  
  // Helper function to create debug links
  const createDebugLink = (path, label, explanation) => {
    const style = {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: '#3b82f6',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '4px',
      fontWeight: 500,
      margin: '5px',
    };
    
    return (
      <div style={{ margin: '10px 0' }}>
        <a href={path} style={style}>{label}</a>
        <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>{explanation}</span>
      </div>
    );
  };
  
  // Helper function to enable debug mode
  const enableDebugMode = () => {
    try {
      localStorage.setItem('adminDebugMode', 'true');
      alert('Debug mode enabled in localStorage! You can now access admin routes directly.');
      window.location.reload();
    } catch (e) {
      console.error('Failed to set debug mode', e);
      alert('Error: Failed to set debug mode in localStorage.');
    }
  };
  
  // Helper function to disable debug mode
  const disableDebugMode = () => {
    try {
      localStorage.removeItem('adminDebugMode');
      alert('Debug mode disabled in localStorage.');
      window.location.reload();
    } catch (e) {
      console.error('Failed to clear debug mode', e);
      alert('Error: Failed to clear debug mode from localStorage.');
    }
  };
  
  // Helper function to check debug mode
  const isDebugMode = () => {
    try {
      return localStorage.getItem('adminDebugMode') === 'true';
    } catch (e) {
      return false;
    }
  };
  
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      border: '3px solid red',
      borderRadius: '10px',
      marginTop: '40px'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Admin Test Page - No Dependencies
      </h1>
      <p style={{ marginBottom: '15px' }}>
        This is an absolute minimal test page with no dependencies or context providers.
        If this page redirects, it suggests the issue is at the routing level.
      </p>
      <p style={{ marginBottom: '15px' }}>
        Current path: <strong>{window.location.pathname}</strong>
      </p>
      <p style={{ marginBottom: '15px' }}>
        Current URL: <strong>{window.location.href}</strong>
      </p>
      <p style={{ marginBottom: '15px' }}>
        Debug mode: <strong>{isDebugMode() ? 'ENABLED ✅' : 'DISABLED ❌'}</strong>
      </p>
      
      <hr style={{ margin: '20px 0' }} />
      
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
          Troubleshooting Options:
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={isDebugMode() ? disableDebugMode : enableDebugMode}
            style={{
              padding: '8px 16px',
              backgroundColor: isDebugMode() ? '#ef4444' : '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isDebugMode() ? 'Disable Debug Mode' : 'Enable Debug Mode'}
          </button>
          <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>
            {isDebugMode() 
              ? 'This will disable persistent debug mode in localStorage.' 
              : 'This will enable persistent debug mode in localStorage to bypass admin checks.'}
          </span>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
            Try these routes:
          </h3>
          
          {createDebugLink('/admin?debug=true', 'Admin with Debug', 'Access admin page with debug parameter')}
          {createDebugLink('/admin/dashboard?debug=true', 'Dashboard with Debug', 'Access dashboard with debug parameter')}
          {createDebugLink('/admin-dashboard-direct', 'Direct Dashboard', 'Bypass AdminRoute but still uses all providers')}
          {createDebugLink('/admin-super-direct', 'Super Direct Dashboard', 'Uses minimal providers (AuthProvider only)')}
          {createDebugLink('/admin-test', 'Admin Test', 'Diagnostic test page for admin functions')}
          {createDebugLink('/db-diagnostic', 'Database Diagnostic', 'Check database connection and product initialization')}
          {createDebugLink('/admin?simple=true', 'Simple Mode Admin', 'Uses the original simple parameter')}
        </div>
      </div>
      
      <hr style={{ margin: '20px 0' }} />
      
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
          Browser Details:
        </h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>User Agent: {navigator.userAgent}</li>
          <li>Platform: {navigator.platform}</li>
          <li>Cookies Enabled: {navigator.cookieEnabled ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AgeVerificationProvider>
            <CartProvider>
              <DistrictProvider>
                <ScrollToTop />
                <InitialLoadingScreen />
                <CartDrawer />
                <FirstTimeUserBanner />
                <InitialFlowHandler />
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/faq" element={<FAQ />} />
                  {/* Order tracking is now only for admin users */}
                  <Route path="/order-tracking/:id" element={
                    <AdminRoute>
                      <OrderTracking />
                    </AdminRoute>
                  } />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <AdminRoute>
                      <AdminOrderTracking />
                    </AdminRoute>
                  } />
                  <Route path="/admin/dashboard" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  {/* Add redirect for non-existent admin-login page */}
                  <Route path="/admin-login" element={<Navigate to="/auth" replace />} />
                  {/* Add a direct access route that bypasses AdminRoute */}
                  <Route path="/admin-dashboard-direct" element={<AdminDashboard />} />
                  {/* Absolute bypass route - only minimal providers */}
                  <Route path="/admin-super-direct" element={<StableAdminDashboardWrapper />} />
                  {/* Ultra minimal test page - no dependencies at all */}
                  <Route path="/admin-test" element={<AdminTest />} />
                  <Route path="/admin-minimal" element={<MinimalAdminDashboard />} />
                  <Route path="/order-test" element={<OrderTestPage />} />
                  <Route path="/admin-minimal-test" element={<MinimalTestPage />} />
                  <Route path="/admin-troubleshooting" element={<AdminTroubleshooting />} />
                  <Route path="/direct-admin" element={<DirectAdminAccess />} />
                  <Route path="/dateschutz" element={<Dateschutz />} />
                  <Route path="/agb" element={<AGB />} />
                  <Route path="/impressum" element={<Impressum />} />
                  <Route path="/db-diagnostic" element={<DatabaseDiagnostic />} />
                  <Route path="/diagnostic" element={<Diagnostic />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DistrictProvider>
            </CartProvider>
          </AgeVerificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
