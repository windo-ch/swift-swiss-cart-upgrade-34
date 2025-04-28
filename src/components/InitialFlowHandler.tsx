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
  
  // Add debugging for each render
  useEffect(() => {
    console.log("🔍 InitialFlowHandler rendering:", {
      path: location.pathname,
      search: location.search,
      isVerified,
      selectedDistrict,
      initialSetupComplete
    });
  }, [location, isVerified, selectedDistrict, initialSetupComplete]);
  
  // Step 1: Show age verification ONLY if not verified yet
  useEffect(() => {
    if (isVerified === false && !showAgeModal) {
      console.log("🔍 Opening age verification modal");
      setShowAgeModal(true);
    }
  }, [isVerified, showAgeModal]);
  
  // Step 2: After age verification, show district selection ONLY if no district is selected
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const forceDistrictSelection = searchParams.get('select-district') === 'true';
    
    if ((isVerified === true && !selectedDistrict && !isDistrictModalOpen) || forceDistrictSelection) {
      // Check for admin routes - don't show district modal for admin routes
      const isAdminRoute = location.pathname.includes('/admin') || 
                          location.pathname === '/admin' || 
                          location.pathname.startsWith('/admin/');
      
      // Don't show district modal for test routes either
      const isTestRoute = location.pathname.includes('-test') || 
                         location.pathname.includes('/test');
      
      if (isAdminRoute || isTestRoute) {
        console.log("🔍 Skipping district modal for admin/test route:", location.pathname);
        return;
      }
      
      console.log("🔍 Opening district selection modal");
      // Small delay to ensure age verification modal is fully closed
      const timer = setTimeout(() => {
        openDistrictModal();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVerified, selectedDistrict, isDistrictModalOpen, openDistrictModal, location]);
  
  // Step 3: After district selection, redirect to products ONLY if at root path or initial setup
  useEffect(() => {
    if (isVerified === true && selectedDistrict && !initialSetupComplete) {
      setInitialSetupComplete(true);
      
      // Check for admin routes - don't redirect for admin routes
      const isAdminRoute = location.pathname.includes('/admin') || 
                          location.pathname === '/admin' || 
                          location.pathname.startsWith('/admin/');
      
      // Only redirect if we're at the root path and not an admin route
      if (location.pathname === '/' && !isAdminRoute) {
        console.log('🔍 InitialFlowHandler: Redirecting to products page');
        navigate('/products');
      } else {
        console.log('🔍 InitialFlowHandler: No redirect needed', {
          path: location.pathname,
          isAdminRoute
        });
      }
    }
  }, [isVerified, selectedDistrict, navigate, location.pathname, initialSetupComplete]);
  
  const handleAgeVerify = (isAdult: boolean) => {
    console.log('🔍 Age verified:', isAdult);
    verifyAge(isAdult);
    setShowAgeModal(false);
  };
  
  const handleDistrictSelect = (district: string) => {
    console.log('🔍 District selected:', district);
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
