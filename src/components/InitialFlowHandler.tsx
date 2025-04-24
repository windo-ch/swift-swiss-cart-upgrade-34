import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';
import { useDistrict } from '@/contexts/DistrictContext';
import AgeVerificationModal from './AgeVerificationModal';
import DistrictSelectionModal from './DistrictSelectionModal';

const InitialFlowHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isVerified, isAdult, verifyAge } = useAgeVerification();
  const { 
    selectedDistrict, 
    setSelectedDistrict, 
    isDistrictModalOpen, 
    openDistrictModal, 
    closeDistrictModal 
  } = useDistrict();
  
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [initialSetupComplete, setInitialSetupComplete] = useState(false);
  
  // Step 1: Show age verification ONLY if not verified yet
  useEffect(() => {
    if (isVerified === false && !showAgeModal) {
      setShowAgeModal(true);
    }
  }, [isVerified, showAgeModal]);
  
  // Step 2: After age verification, show district selection ONLY if no district is selected
  useEffect(() => {
    if (isVerified === true && !selectedDistrict && !isDistrictModalOpen) {
      // Small delay to ensure age verification modal is fully closed
      const timer = setTimeout(() => {
        openDistrictModal();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVerified, selectedDistrict, isDistrictModalOpen, openDistrictModal]);
  
  // Step 3: After district selection, redirect to products ONLY if at root path or initial setup
  useEffect(() => {
    if (isVerified === true && selectedDistrict && !initialSetupComplete) {
      setInitialSetupComplete(true);
      
      // Only redirect if we're at the root path
      if (location.pathname === '/') {
        navigate('/products');
      }
    }
  }, [isVerified, selectedDistrict, navigate, location.pathname, initialSetupComplete]);
  
  const handleAgeVerify = (isAdult: boolean) => {
    verifyAge(isAdult);
    setShowAgeModal(false);
  };
  
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
  };
  
  return (
    <>
      {/* Only show age modal if needed */}
      {showAgeModal && (
        <AgeVerificationModal
          isOpen={showAgeModal}
          onVerify={handleAgeVerify}
        />
      )}
      
      {/* Only show district modal if age is verified but no district selected */}
      {!showAgeModal && isVerified && !selectedDistrict && (
        <DistrictSelectionModal
          isOpen={isDistrictModalOpen}
          onClose={closeDistrictModal}
          onSelectDistrict={handleDistrictSelect}
        />
      )}
    </>
  );
};

export default InitialFlowHandler;
