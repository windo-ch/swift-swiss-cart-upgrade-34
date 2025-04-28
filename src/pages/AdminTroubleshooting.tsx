import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { RefreshCw, Lock, Key, BadgeAlert, Bug, CheckCircle, Settings } from 'lucide-react';

// Same isAdmin function as in AdminRoute.tsx
const isAdmin = (email: string | undefined) => {
  if (!email) return false;
  
  const targetEmails = ['op@windo.ch', 'test@brings.ch', 'admin@example.com'];
  
  // Try case-insensitive matching as a fallback
  const isExactMatch = targetEmails.includes(email);
  const isCaseInsensitiveMatch = targetEmails.some(target => 
    email.toLowerCase() === target.toLowerCase()
  );
  
  return email.endsWith('@brings.ch') || 
         email.endsWith('@admin.ch') || 
         isExactMatch || 
         isCaseInsensitiveMatch;
};

// Debug mode helpers
const isDebugMode = () => {
  try {
    return localStorage.getItem('adminDebugMode') === 'true';
  } catch (e) {
    return false;
  }
};

const setDebugMode = (enabled: boolean) => {
  try {
    if (enabled) {
      localStorage.setItem('adminDebugMode', 'true');
    } else {
      localStorage.removeItem('adminDebugMode');
    }
    return true;
  } catch (e) {
    console.error('Failed to update debug mode in localStorage', e);
    return false;
  }
};

const AdminTroubleshooting = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [debugMode, setDebugModeState] = useState(isDebugMode());
  
  useEffect(() => {
    // If user is available, extract relevant information
    if (user) {
      setUserData({
        id: user.id,
        email: user.email,
        isAdmin: isAdmin(user.email),
        emailVerified: user.email_confirmed_at ? true : false,
        lastSignIn: user.last_sign_in_at,
        provider: user.app_metadata?.provider || 'unknown',
        fullUser: JSON.stringify(user, null, 2)
      });
    }
  }, [user]);
  
  const handleFixAdminRights = async () => {
    if (!user?.email) return;
    
    try {
      // Simply check if the current session is valid
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.log('Error checking session:', sessionError);
        toast({
          title: 'Error',
          description: 'Problem retrieving current session: ' + sessionError.message,
          variant: 'destructive'
        });
        return;
      }
      
      if (!session.session) {
        toast({
          title: 'Session Invalid',
          description: 'Your login session appears to be invalid. Try signing out and in again.',
          variant: 'destructive'
        });
        return;
      }
      
      toast({
        title: 'Session Valid',
        description: 'Your login session is valid. Email: ' + user.email,
      });
      
    } catch (error) {
      console.error('Error checking session:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    }
  };
  
  const handleForceSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed Out',
        description: 'You have been signed out successfully.'
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Could not sign out',
        variant: 'destructive'
      });
    }
  };
  
  const toggleDebugMode = () => {
    const newMode = !debugMode;
    if (setDebugMode(newMode)) {
      setDebugModeState(newMode);
      toast({
        title: newMode ? 'Debug Mode Enabled' : 'Debug Mode Disabled',
        description: newMode 
          ? 'You can now access admin pages directly.' 
          : 'Admin pages will now require proper authentication.',
        variant: newMode ? 'default' : 'destructive',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Could not update debug mode. LocalStorage may be disabled.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Bug className="mr-2 h-6 w-6 text-orange-500" />
            Admin Access Troubleshooting
          </h1>
          
          <div className="flex gap-2">
            <Button
              variant={debugMode ? "destructive" : "default"}
              onClick={toggleDebugMode}
              className="flex items-center gap-2"
            >
              {debugMode ? (
                <>
                  <Lock className="h-4 w-4" />
                  Disable Debug Mode
                </>
              ) : (
                <>
                  <Key className="h-4 w-4" />
                  Enable Debug Mode
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        
        {debugMode && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-4">
            <h2 className="text-lg font-semibold text-green-700 flex items-center mb-2">
              <CheckCircle className="mr-2 h-5 w-5" />
              Debug Mode Enabled
            </h2>
            <p className="text-green-600 mb-2">Debug mode is currently enabled. You can access admin routes directly without authentication.</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Link to="/admin" className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-md text-sm">
                Admin Home
              </Link>
              <Link to="/admin/dashboard" className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-md text-sm">
                Admin Dashboard
              </Link>
              <Link to="/admin/orders" className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-md text-sm">
                Admin Orders
              </Link>
              <Link to="/db-diagnostic" className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-md text-sm">
                Database Diagnostic
              </Link>
            </div>
          </div>
        )}
        
        {!user ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
            <p className="font-medium text-yellow-700 flex items-center">
              <BadgeAlert className="mr-2 h-5 w-5" />
              Not logged in
            </p>
            <p className="text-yellow-600">You need to log in to troubleshoot admin access.</p>
            <Link to="/auth" className="mt-3 inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium hover:bg-yellow-200">
              Go to Login Page
            </Link>
          </div>
        ) : (
          <>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Settings className="mr-2 h-5 w-5 text-gray-500" />
                User Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">User ID:</span> {user.id}</p>
                  <p><span className="font-medium">Admin Status:</span> {isAdmin(user.email) ? 
                    <span className="text-green-600 font-medium">Admin ✓</span> : 
                    <span className="text-red-600 font-medium">Not Admin ✗</span>}
                  </p>
                </div>
                <div>
                  <p><span className="font-medium">Email Verified:</span> {userData?.emailVerified ? 'Yes' : 'No'}</p>
                  <p><span className="font-medium">Last Sign In:</span> {userData?.lastSignIn || 'Unknown'}</p>
                  <p><span className="font-medium">Auth Provider:</span> {userData?.provider}</p>
                </div>
              </div>
              
              {userData && (
                <div>
                  <h3 className="text-md font-medium mb-2">Full User Object:</h3>
                  <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-xs">
                    {userData.fullUser}
                  </pre>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-4">
              <h2 className="text-lg font-semibold mb-3">Troubleshooting Actions</h2>
              
              <div className="flex flex-col md:flex-row gap-3">
                <Button onClick={handleFixAdminRights} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Check User in Database
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/admin/dashboard'}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Try Admin Dashboard
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/admin-test'}
                  className="flex items-center gap-2"
                >
                  <Bug className="h-4 w-4" />
                  Go to Test Page
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleForceSignOut}
                  className="flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Force Sign Out
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h2 className="text-lg font-semibold mb-2 text-blue-700">Admin Access Rules</h2>
              <p className="mb-2 text-blue-600">To be an admin, your email must meet one of these criteria:</p>
              <ul className="list-disc pl-5 text-blue-600">
                <li>End with <code>@brings.ch</code></li>
                <li>End with <code>@admin.ch</code></li>
                <li>Be exactly <code>op@windo.ch</code></li>
                <li>Be exactly <code>test@brings.ch</code></li>
                <li>Be exactly <code>admin@example.com</code> (test account)</li>
              </ul>
              
              <div className="mt-4 p-3 bg-blue-100 rounded-md">
                <h3 className="font-medium text-blue-700 mb-1">Bypass Options:</h3>
                <p className="text-blue-600 text-sm">You can bypass admin authentication by:</p>
                <ul className="list-disc pl-5 text-blue-600 text-sm">
                  <li>Enabling debug mode (recommended)</li>
                  <li>Adding <code>?debug=true</code> or <code>?simple=true</code> to any admin URL</li>
                  <li>Using direct routes like <code>/admin-dashboard-direct</code> or <code>/admin-super-direct</code></li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminTroubleshooting; 