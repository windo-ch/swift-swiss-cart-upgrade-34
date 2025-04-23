
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';
import { useDistrict } from '@/contexts/DistrictContext';
import AgeVerificationModal from './AgeVerificationModal';
import DistrictSelectionModal from './DistrictSelectionModal';

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
  
  // Step 1: Show age verification ONLY if not verified
  useEffect(() => {
    if (isVerified === false) {
      setShowAgeModal(true);
    }
  }, [isVerified]);
  
  // Step 2: After age verification, show district selection ONLY if no district is selected
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
