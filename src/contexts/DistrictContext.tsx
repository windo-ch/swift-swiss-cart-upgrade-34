
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // Check localStorage on mount
  useEffect(() => {
    const savedDistrict = localStorage.getItem('selectedDistrict');
    if (savedDistrict) {
      setSelectedDistrictState(savedDistrict);
    }
  }, []);

  const setSelectedDistrict = (district: string) => {
    setSelectedDistrictState(district);
    localStorage.setItem('selectedDistrict', district);
    setIsDistrictModalOpen(false);
  };

  const openDistrictModal = () => {
    setIsDistrictModalOpen(true);
  };

  const closeDistrictModal = () => {
    setIsDistrictModalOpen(false);
    
    // If no district is selected yet, redirect to products page
    if (!selectedDistrict) {
      navigate('/products');
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
