
import React from 'react';
import ProductCard from './ProductCard';
import NoProducts from './NoProducts';
import { useAgeVerification } from '../../contexts/AgeVerificationContext';
import { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const { isAdult } = useAgeVerification();
  
  // Filter out age-restricted products if the user is not verified as an adult
  const filteredProducts = isAdult 
    ? products 
    : products.filter(product => !product.ageRestricted);

  if (filteredProducts.length === 0) {
    return <NoProducts />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={`product-${product.id.toString()}`} 
          product={product} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
