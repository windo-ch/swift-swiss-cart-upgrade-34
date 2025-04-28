
import React from 'react';
import { useAgeVerification } from '../../contexts/AgeVerificationContext';
import { Shield } from 'lucide-react';

const NoProducts = () => {
  const { isAdult } = useAgeVerification();

  return (
    <div className="text-center py-16">
      {!isAdult ? (
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-brings-primary" />
          </div>
          <p className="text-gray-500 text-lg">Altersbeschtränkti Produkt händ mir versteckt.</p>
          <p className="text-gray-400 mt-2">Um alli Produkt z'gseh, muesch d'Altersverifikation abschliesse.</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-500 text-lg">Kei Produkt gfunde.</p>
          <p className="text-gray-400">Probier en anderi Suechi oder Filter.</p>
        </div>
      )}
    </div>
  );
};

export default NoProducts;
