
import React, { createContext, useContext } from 'react';
import { useAdminProducts } from '@/hooks/use-admin-products';
import type { AdminContextType } from '@/types/admin';

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const adminProducts = useAdminProducts();

  return (
    <AdminContext.Provider value={adminProducts}>
      {children}
    </AdminContext.Provider>
  );
};

// Add the useAdmin hook export directly to the context file for better organization
export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
