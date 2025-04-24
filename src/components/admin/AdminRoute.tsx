import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// This is a simple check to determine if a user is an admin
// In a real-world app, you might have a more sophisticated check
// such as checking user roles in a database
const isAdmin = (email: string | undefined) => {
  // For security in production
  if (!email) {
    console.log("No email provided to isAdmin check");
    return false;
  }
  
  // Debug all whitelisted admin emails to check for case issues
  const targetEmails = ['op@windo.ch', 'test@brings.ch'];
  console.log("Admin check details:");
  console.log(`- User email: '${email}'`);
  console.log(`- Email lowercase: '${email.toLowerCase()}'`);
  console.log("- Trying to match against:");
  targetEmails.forEach(target => {
    console.log(`  '${target}': ${email === target ? 'MATCH ✓' : 'NO MATCH'}`);
    console.log(`  '${target.toLowerCase()}' (lowercase): ${email.toLowerCase() === target.toLowerCase() ? 'MATCH ✓' : 'NO MATCH'}`);
  });
  console.log(`- Domain @brings.ch check: ${email.endsWith('@brings.ch') ? 'MATCH ✓' : 'NO MATCH'}`);
  console.log(`- Domain @admin.ch check: ${email.endsWith('@admin.ch') ? 'MATCH ✓' : 'NO MATCH'}`);
  
  // Try case-insensitive matching as a fallback
  const isExactMatch = email === 'op@windo.ch' || email === 'test@brings.ch';
  const isCaseInsensitiveMatch = email.toLowerCase() === 'op@windo.ch' || 
                                email.toLowerCase() === 'test@brings.ch';
  
  // Admin emails end with @brings.ch or @admin.ch
  // Add additional authorized domains if needed
  const result = email.endsWith('@brings.ch') || 
         email.endsWith('@admin.ch') || 
         isExactMatch || 
         isCaseInsensitiveMatch; // Try case-insensitive as a backup
         
  console.log("Final admin check result:", result);
  return result;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("AdminRoute - Current user:", user);
    if (user) {
      console.log("User email:", user.email);
      console.log("Admin check result:", isAdmin(user.email));
    }
  }, [user]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brings-primary" />
      </div>
    );
  }
  
  // Real production authentication check
  if (!user) {
    console.log("No user found, redirecting to auth");
    toast({
      title: "Authentication Required",
      description: "Please log in to access the admin area",
      variant: "destructive"
    });
    return <Navigate to="/auth" replace />;
  }
  
  if (!isAdmin(user.email)) {
    console.log("User is not admin, redirecting to home");
    toast({
      title: "Access Denied",
      description: `The email ${user.email} does not have admin privileges`,
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }
  
  console.log("Admin access granted");
  return <>{children}</>;
};

export default AdminRoute;
