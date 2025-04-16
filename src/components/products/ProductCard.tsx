
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Shield, AlertCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [hasImageError, setHasImageError] = useState(false);
  const placeholderImage = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock < 10;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={hasImageError ? placeholderImage : product.image} 
            alt={product.name} 
            className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${isOutOfStock ? 'opacity-50' : ''}`}
            onError={() => setHasImageError(true)}
            loading="lazy"
          />
        </Link>
        {product.ageRestricted && (
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
        <span className="text-xs text-gray-500 mb-1 block capitalize">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 hover:text-brings-primary transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-bold text-brings-dark">CHF {product.price.toFixed(2)}</span>
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
