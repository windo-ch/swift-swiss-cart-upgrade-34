
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DistrictSelection from '../components/DistrictSelection';
import ProductBrowsing from '../components/ProductBrowsing';
import PromoBanner from '../components/PromoBanner';
import { MapPin } from 'lucide-react';

type OrderStep = 'district' | 'products';

const Order = () => {
  const [currentStep, setCurrentStep] = useState<OrderStep>('district');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setCurrentStep('products');
  };

  const handleBack = () => {
    if (currentStep === 'products') {
      setCurrentStep('district');
      setSelectedDistrict(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main className="flex-grow">
        {/* Order progress indicator */}
        <div className="bg-brings-light py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <div className={`flex flex-col items-center ${currentStep === 'district' ? 'text-brings-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === 'district' ? 'bg-brings-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <MapPin size={16} />
                </div>
                <span className="text-sm font-medium">Kreis wähle</span>
              </div>
              <div className={`w-12 h-0.5 ${currentStep === 'products' ? 'bg-brings-primary' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${currentStep === 'products' ? 'text-brings-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === 'products' ? 'bg-brings-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <span className="text-xs font-bold">2</span>
                </div>
                <span className="text-sm font-medium">Produkt wähle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on current step */}
        <div className="container mx-auto px-4 py-8">
          {currentStep === 'district' && (
            <DistrictSelection 
              city="zurich"
              onSelectDistrict={handleDistrictSelect} 
              onBack={handleBack}
            />
          )}
          
          {currentStep === 'products' && selectedDistrict && (
            <ProductBrowsing 
              city="zurich"
              district={selectedDistrict} 
              onBack={handleBack}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
