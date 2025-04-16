
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-brings-dark mb-6">Das chönt dir au gfalle</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-40">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <p className="font-bold text-brings-primary mt-1">CHF {product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
