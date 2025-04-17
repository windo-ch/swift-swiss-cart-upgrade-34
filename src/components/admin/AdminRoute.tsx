
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// This is a simple check to determine if a user is an admin
// In a real-world app, you might have a more sophisticated check
// such as checking user roles in a database
const isAdmin = (email: string | undefined) => {
  // For development purposes, allow all users to access admin pages
  // TEMPORARY: Remove this line and uncomment the code below for production
  return true;
  
  // Production code (commented out for development)
  // if (!email) return false;
  // return email.endsWith('@brings.ch') || email.endsWith('@admin.ch');
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
  
  // For development, we still require a user to be logged in
  // but we don't check if they're an admin
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default AdminRoute;
