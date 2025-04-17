
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories-data';

const CategorySection = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId: string) => {
    // Navigate to products page with the selected category as a query parameter
    navigate(`/products?category=${categoryId}`);
  };
  
  return (
    <section className="py-12 bg-brings-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brings-dark mb-2">Wähl dini Kategorie</h2>
          <p className="text-gray-600">Entdeck üsi vilfältige Produkt</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.filter(category => category.id !== 'all').map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="category-card flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 transform hover:scale-105 bg-white hover:bg-brings-primary/5 text-brings-dark"
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <h3 className="text-sm font-medium text-center">{category.name}</h3>
            </button>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/products" className="inline-flex items-center text-brings-primary hover:underline font-medium">
            Alli Kategorie azeige
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
