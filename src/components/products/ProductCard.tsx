import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Shield } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../data/products';

interface ProductCardProps {
  product: {
    id: number | string;
    name: string;
    price: number;
    image: string;
    category: string;
    ageRestricted?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
            }}
          />
        </Link>
        {product.ageRestricted && (
          <div className="absolute top-2 right-2 bg-brings-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Shield size={12} className="mr-1" />
            18+
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            variant="default" 
            className="bg-brings-primary hover:bg-brings-primary/90"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2" size={16} />
            In Warechorb
          </Button>
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs text-gray-500 mb-1 block">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 hover:text-brings-primary transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-brings-dark">CHF {product.price.toFixed(2)}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-brings-primary hover:text-brings-primary/90 hover:bg-brings-primary/10 p-1"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
