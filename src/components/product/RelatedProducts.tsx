
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { getProductImageUrl } from '@/utils/product-utils';

interface RelatedProductsProps {
  products: Product[];
}

const PLACEHOLDER_IMAGE = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-product-placeholder.png';

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-brings-dark mb-6">Das chönt dir au gfalle</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <RelatedProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const RelatedProductItem = ({ product }: { product: Product }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  
  useEffect(() => {
    setHasImageError(false);
    const processedUrl = getProductImageUrl(product.image);
    setImageSrc(processedUrl);
  }, [product.image]);

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative h-40">
        <img 
          src={hasImageError ? PLACEHOLDER_IMAGE : imageSrc} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={() => setHasImageError(true)}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800">{product.name}</h3>
        <p className="font-bold text-brings-primary mt-1">CHF {product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default RelatedProducts;
