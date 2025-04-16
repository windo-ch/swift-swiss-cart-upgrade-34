
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  ageRestricted?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  category,
  isNew = false,
  isFeatured = false,
  ageRestricted = false
}) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({ id, name, price, image, category });
  };
  
  return (
    <div className="product-card group">
      {/* Product Image with Overlay */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="product-image transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md opacity-70 hover:opacity-100 transition-opacity duration-200">
          <Heart size={16} className="text-brings-dark" />
        </button>
        
        {/* New/Featured Badge */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-brings-accent text-brings-dark text-xs font-bold px-2 py-1 rounded">NEU</span>
        )}
        {isFeatured && !isNew && (
          <span className="absolute top-2 left-2 bg-brings-secondary text-brings-dark text-xs font-bold px-2 py-1 rounded">BELIEBT</span>
        )}
        {ageRestricted && (
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
        <p className="text-xs text-gray-500 uppercase mb-1">{category}</p>
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-brings-dark mb-1 line-clamp-2">{name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-brings-dark">CHF {price.toFixed(2)}</span>
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
