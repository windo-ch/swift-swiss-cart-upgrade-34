
import React from 'react';
import { Clock, Truck, Tag } from 'lucide-react';

const PromoBanner = () => {
  return (
    <div className="bg-shop-dark text-white py-3">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-center">
            <Truck size={20} className="mr-2 text-shop-secondary" />
            <span>Gratis Lieferig ab CHF 50</span>
          </div>
          <div className="flex items-center justify-center">
            <Clock size={20} className="mr-2 text-shop-secondary" />
            <span>Glichtagsliferig möglich</span>
          </div>
          <div className="flex items-center justify-center">
            <Tag size={20} className="mr-2 text-shop-secondary" />
            <span>Nüi Kunden: 15% Rabatt uf die ersti Bstellig</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
