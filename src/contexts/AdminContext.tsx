
import React, { createContext, useState } from 'react';
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
