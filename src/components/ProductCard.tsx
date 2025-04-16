
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Shield, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/product';

interface ProductCardProps {
  product?: Product;
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  category?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  ageRestricted?: boolean;
}

const PLACEHOLDER_IMAGE = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-product-placeholder.png';

const ProductCard = ({ 
  product,
  id, 
  name, 
  price, 
  image, 
  category, 
  isNew = false, 
  isFeatured = false, 
  ageRestricted = false 
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const [hasImageError, setHasImageError] = useState(false);

  // Handle both ways of passing props (as a product object or as individual props)
  const productId = product?.id?.toString() || id;
  const productName = product?.name || name;
  const productPrice = product?.price || price;
  const productImage = product?.image || image;
  const productCategory = product?.category || category;
  const productIsNew = product?.isNew || isNew;
  const productIsFeatured = product?.isFeatured || isFeatured;
  const productAgeRestricted = product?.ageRestricted || ageRestricted;

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      category: productCategory
    });
  };

  if (!productId || !productName || !productPrice || !productImage || !productCategory) {
    return null;
  }

  return (
    <div className="product-card group">
      {/* Product Image with Overlay */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${productId}`}>
          <img 
            src={hasImageError ? PLACEHOLDER_IMAGE : productImage} 
            alt={productName} 
            className="product-image transition-transform duration-300 group-hover:scale-105"
            onError={() => {
              console.error(`Error loading product image: ${productImage} for ${productName}`);
              setHasImageError(true);
            }}
            loading="lazy"
          />
        </Link>
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md opacity-70 hover:opacity-100 transition-opacity duration-200">
          <Heart size={16} className="text-brings-dark" />
        </button>
        
        {/* New/Featured Badge */}
        {productIsNew && (
          <span className="absolute top-2 left-2 bg-brings-accent text-brings-dark text-xs font-bold px-2 py-1 rounded">NEU</span>
        )}
        {productIsFeatured && !productIsNew && (
          <span className="absolute top-2 left-2 bg-brings-secondary text-brings-dark text-xs font-bold px-2 py-1 rounded">BELIEBT</span>
        )}
        {productAgeRestricted && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">18+</span>
        )}
        
        {/* Quick Add Button */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-brings-primary/90 text-white py-2 flex justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"
        >
          <div className="flex items-center text-sm font-medium">
            <ShoppingCart size={16} className="mr-1" />
            In Warächorb
          </div>
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase mb-1">{productCategory}</p>
        <Link to={`/product/${productId}`}>
          <h3 className="font-medium text-brings-dark mb-1 line-clamp-2">{productName}</h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-brings-dark">CHF {productPrice.toFixed(2)}</span>
          <Button 
            size="sm" 
            className="bg-brings-primary hover:bg-brings-primary/90 text-white h-8 w-8 p-0 rounded-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
