
import React, { useState, useEffect } from 'react';

interface ProductImageProps {
  image: string;
  name: string;
}

const PLACEHOLDER_IMAGE = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-product-placeholder.png';

const ProductImage = ({ image, name }: ProductImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setHasError(false);
    setImageSrc(image || PLACEHOLDER_IMAGE);
  }, [image]);

  const handleImageError = () => {
    console.error(`Error loading image: ${imageSrc} for product: ${name}`);
    setHasError(true);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img 
        src={hasError ? PLACEHOLDER_IMAGE : imageSrc} 
        alt={name} 
        className="w-full h-auto object-cover aspect-square"
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
