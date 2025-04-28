import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface DistrictContextType {
  selectedDistrict: string | null;
  setSelectedDistrict: (district: string) => void;
  isDistrictSelected: boolean;
  isDistrictModalOpen: boolean;
  openDistrictModal: () => void;
  closeDistrictModal: () => void;
}

const DistrictContext = createContext<DistrictContextType | undefined>(undefined);

export const DistrictProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDistrict, setSelectedDistrictState] = useState<string | null>(null);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check localStorage on mount
  useEffect(() => {
    const savedDistrict = localStorage.getItem('selectedDistrict');
    if (savedDistrict) {
      console.log('⚡ DistrictContext: Loaded district from localStorage:', savedDistrict);
      setSelectedDistrictState(savedDistrict);
    } else {
      console.log('⚡ DistrictContext: No district in localStorage');
    }

    // Log current path for debugging
    console.log('⚡ DistrictContext: Current path:', location.pathname);
  }, [location.pathname]);

  const setSelectedDistrict = (district: string) => {
    console.log('⚡ DistrictContext: Setting district:', district);
    setSelectedDistrictState(district);
    localStorage.setItem('selectedDistrict', district);
    setIsDistrictModalOpen(false);
  };

  const openDistrictModal = () => {
    console.log('⚡ DistrictContext: Opening district modal');
    setIsDistrictModalOpen(true);
  };

  const closeDistrictModal = () => {
    console.log('⚡ DistrictContext: Closing district modal');
    setIsDistrictModalOpen(false);
    
    // Check for admin routes
    const isAdminRoute = location.pathname.includes('/admin') || 
                         location.pathname === '/admin' || 
                         location.pathname.startsWith('/admin/');
    
    // If no district is selected yet, redirect to products page, but not for admin routes
    if (!selectedDistrict && !isAdminRoute) {
      console.log('⚡ DistrictContext: Redirecting to products page');
      navigate('/products');
    } else if (!selectedDistrict && isAdminRoute) {
      console.log('⚡ DistrictContext: Not redirecting for admin route:', location.pathname);
    }
  };

  const value = {
    selectedDistrict,
    setSelectedDistrict,
    isDistrictSelected: !!selectedDistrict,
    isDistrictModalOpen,
    openDistrictModal,
    closeDistrictModal,
  };

  return (
    <DistrictContext.Provider value={value}>
      {children}
    </DistrictContext.Provider>
  );
};

export const useDistrict = () => {
  const context = useContext(DistrictContext);
  if (context === undefined) {
    throw new Error('useDistrict must be used within a DistrictProvider');
  }
  return context;
};
