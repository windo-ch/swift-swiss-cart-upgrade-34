
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  category,
  isNew = false,
  isFeatured = false
}) => {
  return (
    <div className="product-card group">
      {/* Product Image with Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="product-image transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md opacity-70 hover:opacity-100 transition-opacity duration-200">
          <Heart size={16} className="text-gray-600" />
        </button>
        
        {/* New/Featured Badge */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-shop-accent text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
        )}
        {isFeatured && !isNew && (
          <span className="absolute top-2 left-2 bg-shop-secondary text-shop-dark text-xs font-bold px-2 py-1 rounded">FEATURED</span>
        )}
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-shop-primary/90 text-white py-2 flex justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button className="flex items-center text-sm font-medium">
            <ShoppingCart size={16} className="mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase mb-1">{category}</p>
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-shop-dark">${price.toFixed(2)}</span>
          <Button size="sm" className="bg-shop-primary hover:bg-shop-primary/90 text-white h-8 w-8 p-0 rounded-full">
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
