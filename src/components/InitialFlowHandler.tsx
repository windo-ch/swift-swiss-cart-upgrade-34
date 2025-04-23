
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';
import { useDistrict } from '@/contexts/DistrictContext';
import AgeVerificationModal from './AgeVerificationModal';
import DistrictSelectionModal from './DistrictSelectionModal';

/**
 * This component handles the initial flow:
 * 1. First show age verification
 * 2. Then show district selection
 * 3. Finally redirect to products page
 */
const InitialFlowHandler = () => {
  const navigate = useNavigate();
  const { isVerified, isAdult, verifyAge } = useAgeVerification();
  const { 
    selectedDistrict, 
    setSelectedDistrict, 
    isDistrictModalOpen, 
    openDistrictModal, 
    closeDistrictModal 
  } = useDistrict();
  
  const [showAgeModal, setShowAgeModal] = useState(false);
  
  // Step 1: Show age verification if not verified
  useEffect(() => {
    if (isVerified === false) {
      setShowAgeModal(true);
    }
  }, [isVerified]);
  
  // Step 2: After age verification, show district selection
  useEffect(() => {
    if (isVerified === true && !selectedDistrict && !isDistrictModalOpen) {
      openDistrictModal();
    }
  }, [isVerified, selectedDistrict, isDistrictModalOpen, openDistrictModal]);
  
  // Step 3: After district selection, redirect to products
  useEffect(() => {
    if (isVerified === true && selectedDistrict) {
      navigate('/products');
    }
  }, [isVerified, selectedDistrict, navigate]);
  
  // Handle age verification result
  const handleAgeVerify = (isAdult: boolean) => {
    verifyAge(isAdult);
    setShowAgeModal(false);
  };
  
  // Handle district selection
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
  };
  
  return (
    <>
      {/* Age Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeModal}
        onVerify={handleAgeVerify}
      />
      
      {/* District Selection Modal */}
      <DistrictSelectionModal
        isOpen={isDistrictModalOpen}
        onClose={closeDistrictModal}
        onSelectDistrict={handleDistrictSelect}
      />
    </>
  );
};

export default InitialFlowHandler;
