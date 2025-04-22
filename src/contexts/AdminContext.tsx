
import React, { createContext } from 'react';
import { useAdminProducts } from '@/hooks/use-admin-products';
import type { AdminContextType } from '@/types/admin';

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const adminProducts = useAdminProducts();

  return (
    <AdminContext.Provider value={adminProducts}>
      {children}
    </AdminContext.Provider>
  );
};

// Re-export the useAdmin hook for convenience
export { useAdmin } from '@/hooks/use-admin';
