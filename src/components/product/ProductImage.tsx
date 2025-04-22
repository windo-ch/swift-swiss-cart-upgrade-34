
import React, { useState, useEffect } from 'react';
import { getProductImageUrl } from '../../utils/product-utils';

interface ProductImageProps {
  image: string;
  name: string;
}

const PLACEHOLDER_IMAGE = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-product-placeholder.png';

const ProductImage = ({ image, name }: ProductImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Reset error state when image prop changes
    setHasError(false);
    
    if (!image) {
      setImageSrc(PLACEHOLDER_IMAGE);
      return;
    }
    
    // Process the image URL to ensure it's a full Supabase URL
    try {
      const processedUrl = image.includes('http') ? image : getProductImageUrl(image);
      console.log(`Processing image URL for ${name}: ${image} → ${processedUrl}`);
      setImageSrc(processedUrl);
    } catch (error) {
      console.error(`Error processing image URL for ${name}:`, error);
      setImageSrc(PLACEHOLDER_IMAGE);
      setHasError(true);
    }
  }, [image, name]);

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
