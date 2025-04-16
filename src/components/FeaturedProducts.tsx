
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAgeVerification } from '../contexts/AgeVerificationContext';
import { Button } from '@/components/ui/button';
import { getStoredProducts } from '../utils/product-utils';
import ProductCard from './products/ProductCard';
import { Product } from '../types/product';
import { Loader2 } from 'lucide-react';

const FeaturedProducts = () => {
  const { isAdult } = useAgeVerification();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    try {
      const allProducts = getStoredProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Filter out age-restricted products if not adult
  const filteredProducts = isAdult 
    ? products 
    : products.filter(product => !product.ageRestricted);
  
  // Only show 8 products on the featured page
  const featuredProducts = filteredProducts
    .filter(p => p.isFeatured || Math.random() > 0.7) // Show featured products or random ones
    .slice(0, 8);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-brings-primary mr-2" />
        <span>Produkte werden geladen...</span>
      </div>
    );
  }
  
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
