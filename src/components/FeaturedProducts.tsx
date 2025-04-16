
import React from 'react';
import { Link } from 'react-router-dom';
import { useAgeVerification } from '../contexts/AgeVerificationContext';
import { Button } from '@/components/ui/button';
import { getStoredProducts } from '../data/products';
import ProductCard from './products/ProductCard';

const FeaturedProducts = () => {
  const { isAdult } = useAgeVerification();
  const allProducts = getStoredProducts();
  
  // Filter out age-restricted products if not adult
  const filteredProducts = isAdult 
    ? allProducts 
    : allProducts.filter(product => !product.ageRestricted);
  
  // Only show 8 products on the featured page
  const featuredProducts = filteredProducts.slice(0, 8);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brings-dark mb-2">Beliebteste Produkt</h2>
          <p className="text-gray-600">Üsi Top-Produkt - schnell und frisch glieferet</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id.toString()}
              product={product}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/products">
            <Button className="bg-brings-primary hover:bg-brings-primary/90 text-white font-medium py-2 px-6 rounded-full transition-colors">
              Alli Produkt azeige
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
