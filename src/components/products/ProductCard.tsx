
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Shield, AlertCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';

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
  stock?: number;
}

const ProductCard = ({ 
  product,
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isFeatured = false,
  ageRestricted = false,
  stock
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const [hasImageError, setHasImageError] = useState(false);
  const placeholderImage = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';

  // Handle both ways of passing props (as a product object or as individual props)
  const productId = product?.id?.toString() || id;
  const productName = product?.name || name;
  const productPrice = product?.price || price;
  const productImage = product?.image || image;
  const productCategory = product?.category || category;
  const productIsNew = product?.isNew || isNew;
  const productIsFeatured = product?.isFeatured || isFeatured;
  const productAgeRestricted = product?.ageRestricted || ageRestricted;
  const productStock = product?.stock || stock;

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      category: productCategory
    });
  };

  const isOutOfStock = productStock !== undefined && productStock <= 0;
  const isLowStock = productStock !== undefined && productStock > 0 && productStock < 10;

  if (!productId || !productName || !productPrice || !productImage || !productCategory) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${productId}`}>
          <img 
            src={hasImageError ? placeholderImage : productImage} 
            alt={productName} 
            className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${isOutOfStock ? 'opacity-50' : ''}`}
            onError={() => {
              console.error(`Error loading product image: ${productImage} for ${productName}`);
              setHasImageError(true);
            }}
            loading="lazy"
          />
        </Link>
        {productAgeRestricted && (
          <div className="absolute top-2 right-2 bg-brings-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Shield size={12} className="mr-1" />
            18+
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-full font-semibold">
              Nümme verfügbar
            </div>
          </div>
        )}
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              variant="default" 
              className="bg-brings-primary hover:bg-brings-primary/90"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <ShoppingBag className="mr-2" size={16} />
              In Warechorb
            </Button>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-gray-500 mb-1 block capitalize">{productCategory}</span>
        <Link to={`/product/${productId}`}>
          <h3 className="font-medium text-gray-800 hover:text-brings-primary transition-colors line-clamp-2">{productName}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-bold text-brings-dark">CHF {productPrice.toFixed(2)}</span>
            {isLowStock && (
              <div className="text-xs text-orange-600 flex items-center mt-1">
                <AlertCircle size={12} className="mr-1" />
                Nüme viel verfügbar
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-brings-primary hover:text-brings-primary/90 hover:bg-brings-primary/10 p-1"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <ShoppingBag size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
