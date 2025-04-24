
import React, { useState } from 'react';
import { ChevronLeft, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategorySection from './CategorySection';
import FeaturedProducts from './FeaturedProducts';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

interface ProductBrowsingProps {
  city: string;
  district: string;
  onBack: () => void;
}

const formatDistrict = (district: string): string => {
  // Convert 'kreis1' to 'Kreis 1 (Altstadt)'
  const districtMap: Record<string, string> = {
    'kreis1': 'Kreis 1 (Altstadt)',
    'kreis2': 'Kreis 2 (Wollishofen)',
    'kreis3': 'Kreis 3 (Wiedikon)',
    'kreis4': 'Kreis 4 (Aussersihl)',
    'kreis5': 'Kreis 5 (Industriequartier)',
    'kreis6': 'Kreis 6 (Unterstrass)',
    'kreis7': 'Kreis 7 (Hottingen)',
    'kreis8': 'Kreis 8 (Riesbach)',
    'kreis9': 'Kreis 9 (Altstetten)',
    'kreis10': 'Kreis 10 (Wipkingen)',
    'kreis11': 'Kreis 11 (Affoltern)',
    'kreis12': 'Kreis 12 (Schwamendingen)',
  };
  
  return districtMap[district] || district;
};

// Delivery data per district
const deliveryData = {
  'kreis1': { time: '30-40', fee: 2.90 },
  'kreis2': { time: '35-45', fee: 3.50 },
  'kreis3': { time: '30-40', fee: 2.90 },
  'kreis4': { time: '25-35', fee: 2.50 },
  'kreis5': { time: '25-35', fee: 2.50 },
  'kreis6': { time: '30-40', fee: 2.90 },
  'kreis7': { time: '35-45', fee: 3.50 },
  'kreis8': { time: '40-50', fee: 3.90 },
  'kreis9': { time: '40-50', fee: 3.90 },
  'kreis10': { time: '35-45', fee: 3.50 },
  'kreis11': { time: '45-60', fee: 4.50 },
  'kreis12': { time: '40-55', fee: 4.20 },
};

const ProductBrowsing: React.FC<ProductBrowsingProps> = ({ city, district, onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const formattedDistrict = formatDistrict(district);
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  
  // Get delivery info for the selected district
  const deliveryTime = deliveryData[district]?.time || '30-60';
  const deliveryFee = deliveryData[district]?.fee || 3.50;
  
  const handleCheckout = () => {
    console.log("Navigating to checkout from ProductBrowsing");
    navigate('/checkout');
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2 text-brings-dark hover:text-brings-primary">
            <ChevronLeft size={16} className="mr-1" /> Zrügg
          </Button>
          <h2 className="text-xl font-semibold">
            Produkt usswähle
          </h2>
        </div>
        {totalItems > 0 && (
          <Button 
            onClick={handleCheckout}
            className="bg-brings-primary hover:bg-brings-primary/90"
          >
            Zur Kasse ({totalItems})
          </Button>
        )}
      </div>
      
      <div className="bg-gradient-to-r from-brings-dark to-brings-dark/90 text-white p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-1">Lieferig nach {formattedDistrict}</h3>
            <p className="text-gray-300">Mir bringed dini Produkt nach {formattedCity}, {formattedDistrict}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex items-center text-brings-secondary">
                <Clock size={20} className="mr-2" />
                <span>{deliveryTime} Minute</span>
              </div>
              <div className="flex items-center text-brings-secondary">
                <Truck size={20} className="mr-2" />
                <span>Liefergebühr CHF {deliveryFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={onBack} className="border-brings-secondary text-brings-secondary hover:bg-brings-secondary/10">
              Kreis ändere
            </Button>
          </div>
        </div>
      </div>
      
      {/* Category Selection Section */}
      <div className="mb-8">
        <CategorySection />
      </div>
      
      {/* Products Display Section */}
      <div>
        <FeaturedProducts />
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleCheckout}
          className="bg-brings-primary hover:bg-brings-primary/90 px-8 py-6 text-lg"
        >
          Zur Kasse gah
        </Button>
      </div>
    </div>
  );
};

export default ProductBrowsing;
