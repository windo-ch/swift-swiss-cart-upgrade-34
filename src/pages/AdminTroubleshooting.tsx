import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Same isAdmin function as in AdminRoute.tsx
const isAdmin = (email: string | undefined) => {
  if (!email) return false;
  return email.endsWith('@brings.ch') || 
         email.endsWith('@admin.ch') || 
         email === 'op@windo.ch' ||
         email === 'test@brings.ch';
};

const AdminTroubleshooting = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  
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
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Admin Access Troubleshooting</h1>
        
        {!user ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
            <p className="font-medium text-yellow-700">Not logged in</p>
            <p className="text-yellow-600">You need to log in to troubleshoot admin access.</p>
          </div>
        ) : (
          <>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-4">
              <h2 className="text-lg font-semibold mb-3">User Information</h2>
              
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
                <Button onClick={handleFixAdminRights}>
                  Check User in Database
                </Button>
                
                <Button variant="outline" onClick={() => window.location.href = '/admin/dashboard'}>
                  Try Admin Dashboard Again
                </Button>
                
                <Button variant="destructive" onClick={handleForceSignOut}>
                  Force Sign Out
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h2 className="text-lg font-semibold mb-2 text-blue-700">Admin Access Rules</h2>
              <p className="mb-2 text-blue-600">To be an admin, your email must meet one of these criteria:</p>
              <ul className="list-disc pl-5 text-blue-600">
                <li>End with @brings.ch</li>
                <li>End with @admin.ch</li>
                <li>Be exactly op@windo.ch</li>
                <li>Be exactly test@brings.ch</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminTroubleshooting; 