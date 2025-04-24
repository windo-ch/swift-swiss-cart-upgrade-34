import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// This is a simple check to determine if a user is an admin
// In a real-world app, you might have a more sophisticated check
// such as checking user roles in a database
const isAdmin = (email: string | undefined) => {
  // For security in production
  if (!email) return false;
  
  // Admin emails end with @brings.ch or @admin.ch
  // Add additional authorized domains if needed
  return email.endsWith('@brings.ch') || 
         email.endsWith('@admin.ch') || 
         email === 'op@windo.ch';
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brings-primary" />
      </div>
    );
  }
  
  // Real production authentication check
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!isAdmin(user.email)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default AdminRoute;
