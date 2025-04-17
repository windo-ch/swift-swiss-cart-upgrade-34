
import React from 'react';
import { Clock, Truck, Tag } from 'lucide-react';

const PromoBanner = () => {
  return (
    <div className="bg-brings-dark text-white py-3 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-center">
            <Truck size={20} className="mr-2 text-brings-secondary" />
            <span className="font-medium text-white">Gratis Lieferig ab CHF 50</span>
          </div>
          <div className="flex items-center justify-center">
            <Clock size={20} className="mr-2 text-brings-secondary" />
            <span className="font-medium text-white">30-60 min Lieferziit</span>
          </div>
          <div className="flex items-center justify-center">
            <Tag size={20} className="mr-2 text-brings-secondary" />
            <span className="font-medium text-white">Neukunde: 15% uf di 1. Bstellig</span>
          </div>
        </div>
      </div>
      {/* Animated background element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brings-secondary via-brings-primary to-brings-accent"></div>
      </div>
    </div>
  );
};

export default PromoBanner;
