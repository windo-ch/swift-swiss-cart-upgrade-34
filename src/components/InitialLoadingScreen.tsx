
import React from 'react';
import LoadingAnimation from './LoadingAnimation';
import AgeVerificationModal from './AgeVerificationModal';
import { useAgeVerification } from '../contexts/AgeVerificationContext';

const InitialLoadingScreen = () => {
  const { isLoading, isVerified, verifyAge } = useAgeVerification();

  // Show loading animation while loading
  if (isLoading) {
    return <LoadingAnimation />;
  }

  // Show age verification modal if not yet verified
  if (isVerified === false) {
    return <AgeVerificationModal isOpen={true} onVerify={verifyAge} />;
  }

  // Nothing to show if loading is done and verification is complete
  return null;
};

export default InitialLoadingScreen;
