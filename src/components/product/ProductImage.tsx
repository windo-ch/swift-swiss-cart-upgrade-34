
import React from 'react';

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage = ({ image, name }: ProductImageProps) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <img 
      src={image} 
      alt={name} 
      className="w-full h-auto object-cover aspect-square"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
      }}
    />
  </div>
);

export default ProductImage;
