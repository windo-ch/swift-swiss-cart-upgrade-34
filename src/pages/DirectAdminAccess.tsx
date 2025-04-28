import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DirectAdminAccess = () => {
  const { user } = useAuth();
  const [isActualAdmin, setIsActualAdmin] = useState(false);
  
  useEffect(() => {
    if (user && user.email) {
      // Use the same logic as AdminRoute but with case insensitivity
      const email = user.email.toLowerCase();
      const isAdmin = email.endsWith('@brings.ch') || 
                      email.endsWith('@admin.ch') || 
                      email === 'op@windo.ch' || 
                      email === 'test@brings.ch';
      
      setIsActualAdmin(isAdmin);
      console.log(`Direct access check for ${email}: ${isAdmin ? 'ADMIN ✓' : 'NOT ADMIN ✗'}`);
    }
  }, [user]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Direct Admin Access</h1>
        
        {!user ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
            <p className="font-medium text-yellow-700">Not logged in</p>
            <p className="text-yellow-600">Please log in first to access admin features.</p>
            <Link to="/auth">
              <Button className="mt-4">Go to Login</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 mb-6">
              <h2 className="text-lg font-semibold text-yellow-800">Debug Notice</h2>
              <p className="text-yellow-700">
                If experiencing persistent redirects, try the test pages below to isolate the issue:
              </p>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <a href="/admin-test" className="inline-block">
                  <Button variant="outline" className="bg-yellow-100 border-yellow-300">
                    React Test Page
                  </Button>
                </a>
                
                <a href="/admin-test.html" className="inline-block">
                  <Button variant="outline" className="bg-yellow-100 border-yellow-300">
                    Static HTML Test Page
                  </Button>
                </a>
              </div>
              <p className="text-xs text-yellow-600 mt-2">
                The static HTML page completely bypasses React Router and all providers
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-4">
              <h2 className="text-lg font-semibold mb-3">User Information</h2>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Admin Status:</span> {isActualAdmin ? 
                <span className="text-green-600 font-medium">Admin ✓</span> : 
                <span className="text-red-600 font-medium">Not Admin ✗</span>}
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-4">
              <h2 className="text-lg font-semibold mb-3">Direct Links (Bypass Redirect)</h2>
              <div className="flex flex-col md:flex-row gap-3">
                <a href="/admin/dashboard" className="inline-block">
                  <Button variant="default">
                    Dashboard (Direct Link)
                  </Button>
                </a>
                
                <a href="/admin/orders" className="inline-block">
                  <Button variant="outline">
                    Orders (Direct Link)
                  </Button>
                </a>
                
                <a href="/admin" className="inline-block">
                  <Button variant="outline">
                    Admin Home (Direct Link)
                  </Button>
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                These links bypass the React Router, which means they'll work even if there's an issue with the AdminRoute component.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h2 className="text-lg font-semibold mb-2 text-blue-700">How this works</h2>
              <p className="text-blue-600 mb-2">
                This page uses regular HTML links instead of React Router's Link component to bypass any routing issues.
                If you can access the admin dashboard through these links but not through the regular navigation, 
                there's likely an issue with the AdminRoute component or React Router configuration.
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-md mt-4">
              <h2 className="text-lg font-semibold mb-2 text-green-700">Testing Simplified Dashboard</h2>
              <p className="text-green-600 mb-4">
                A simplified admin dashboard has been created to troubleshoot loading issues.
                Use the link below to access it directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/admin/dashboard?simple=true" className="inline-block">
                  <Button variant="outline" className="bg-green-100">
                    Simplified Dashboard (Direct Link)
                  </Button>
                </a>
                
                <a href="/admin-dashboard-direct" className="inline-block">
                  <Button variant="outline" className="bg-blue-100">
                    New Direct Dashboard (No AdminRoute)
                  </Button>
                </a>
              </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-md mt-4">
              <h2 className="text-lg font-semibold mb-2 text-red-700">Emergency Access (Minimal Providers)</h2>
              <p className="text-red-600 mb-4">
                If all other methods fail, this route bypasses most providers that might cause redirects.
                May have limited functionality but should definitely load.
              </p>
              <a href="/admin-super-direct" className="inline-block">
                <Button variant="outline" className="bg-red-100">
                  Super Direct Dashboard (Emergency)
                </Button>
              </a>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DirectAdminAccess; 