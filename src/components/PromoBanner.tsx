import React from 'react';
import { Clock, Truck, Tag } from 'lucide-react';
const PromoBanner = () => {
  return <div className="bg-brings-dark text-white py-3">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-center">
            <Truck size={20} className="mr-2 text-brings-secondary" />
            <span className="font-medium text-white">Gratis Lieferig ab CHF 50</span>
          </div>
          <div className="flex items-center justify-center">
            <Clock size={20} className="mr-2 text-brings-secondary" />
            <span className="font-medium text-white">30-60 min</span>
          </div>
          <div className="flex items-center justify-center">
            <Tag size={20} className="mr-2 text-brings-secondary" />
            <span className="font-medium text-white">Neuchunde: 15% uf di 1. Bstellig</span>
          </div>
        </div>
      </div>
    </div>;
};
export default PromoBanner;