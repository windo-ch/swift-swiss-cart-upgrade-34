
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategorySection from './CategorySection';
import FeaturedProducts from './FeaturedProducts';

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

const ProductBrowsing: React.FC<ProductBrowsingProps> = ({ city, district, onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const formattedDistrict = formatDistrict(district);
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <h2 className="text-xl font-semibold">
          Browse Products
        </h2>
      </div>
      
      <div className="bg-shop-primary/10 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-shop-dark">Delivering to {formattedDistrict}</h3>
            <p className="text-gray-600">We'll deliver your groceries to {formattedCity}, {formattedDistrict}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={onBack} className="mr-2">
              Change District
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
    </div>
  );
};

export default ProductBrowsing;
