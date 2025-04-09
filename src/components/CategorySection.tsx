
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const categories = [
  { id: 'chips', name: 'Chips & Snacks', icon: '🍿' },
  { id: 'drinks', name: 'Getränk', icon: '🥤' },
  { id: 'sweets', name: 'Süssigkeite', icon: '🍫' },
  { id: 'alcohol', name: 'Alkohol', icon: '🍺' },
  { id: 'energy', name: 'Energy Drinks', icon: '⚡' },
  { id: 'party', name: 'Party Supplies', icon: '🎉' },
];

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  return (
    <section className="py-12 bg-brings-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brings-dark mb-2">Wähl dini Kategorie</h2>
          <p className="text-gray-600">Entdeck üsi vilfältige Produkt</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-card flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id 
                  ? 'bg-brings-primary text-white shadow-md' 
                  : 'bg-white hover:bg-brings-primary/5 text-brings-dark'
              }`}
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <h3 className="text-sm font-medium text-center">{category.name}</h3>
            </button>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="inline-flex items-center text-brings-primary hover:underline font-medium">
            Alli Kategorie azeige
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
