
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const categories = [
  { id: 'fruits', name: 'Fruits & Vegetables', icon: '🍎' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'bakery', name: 'Bakery', icon: '🍞' },
  { id: 'meat', name: 'Meat & Seafood', icon: '🥩' },
  { id: 'pantry', name: 'Pantry', icon: '🥫' },
  { id: 'beverages', name: 'Beverages', icon: '☕' },
];

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  return (
    <section className="py-12 bg-shop-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-shop-dark mb-2">Shop by Category</h2>
          <p className="text-gray-600">Browse our wide selection of products</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-card flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-200 ${
                activeCategory === category.id 
                  ? 'bg-shop-primary text-white shadow-md' 
                  : 'bg-white hover:bg-shop-primary/5 text-gray-800'
              }`}
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <h3 className="text-sm font-medium text-center">{category.name}</h3>
            </button>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="inline-flex items-center text-shop-primary hover:underline font-medium">
            View all categories
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
