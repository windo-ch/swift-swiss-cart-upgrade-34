
import React, { createContext, useContext, useState, useEffect } from 'react';

type AgeVerificationContextType = {
  isLoading: boolean;
  isVerified: boolean | null;
  isAdult: boolean;
  verifyAge: (isAdult: boolean) => void;
};

const AgeVerificationContext = createContext<AgeVerificationContextType | undefined>(undefined);

export const AgeVerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isAdult, setIsAdult] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const storedVerification = localStorage.getItem('age-verified');
    const storedAdult = localStorage.getItem('is-adult');
    
    if (storedVerification === 'true') {
      setIsVerified(true);
      setIsAdult(storedAdult === 'true');
    } else {
      setIsVerified(false);
    }
    
    // Simulate loading for 2 seconds to show the animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const verifyAge = (adult: boolean) => {
    setIsVerified(true);
    setIsAdult(adult);
    localStorage.setItem('age-verified', 'true');
    localStorage.setItem('is-adult', adult ? 'true' : 'false');
  };

  return (
    <AgeVerificationContext.Provider value={{ isLoading, isVerified, isAdult, verifyAge }}>
      {children}
    </AgeVerificationContext.Provider>
  );
};

export const useAgeVerification = () => {
  const context = useContext(AgeVerificationContext);
  if (context === undefined) {
    throw new Error('useAgeVerification must be used within an AgeVerificationProvider');
  }
  return context;
};
