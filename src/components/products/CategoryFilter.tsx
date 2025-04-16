
import React from 'react';
import { Filter } from 'lucide-react';
import { categories } from '../../data/categories-data';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, setActiveCategory }: CategoryFilterProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
      <div className="hidden md:flex items-center mr-2">
        <Filter size={18} className="text-gray-500 mr-1" />
        <span className="text-sm text-gray-500">Filter:</span>
      </div>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category.id 
              ? 'bg-brings-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="mr-1">{category.icon}</span> {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
