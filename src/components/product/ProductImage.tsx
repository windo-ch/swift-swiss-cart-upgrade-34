
import React, { useState } from 'react';

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage = ({ image, name }: ProductImageProps) => {
  const [hasError, setHasError] = useState(false);
  const placeholderImage = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img 
        src={hasError ? placeholderImage : image} 
        alt={name} 
        className="w-full h-auto object-cover aspect-square"
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
