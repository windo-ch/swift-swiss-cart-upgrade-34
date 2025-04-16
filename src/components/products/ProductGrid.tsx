
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
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
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                variant="default" 
                className="bg-brings-primary hover:bg-brings-primary/90"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag className="mr-2" size={16} />
                In Warechorb
              </Button>
            </div>
          </div>
          <div className="p-4">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-medium text-gray-800 hover:text-brings-primary transition-colors">{product.name}</h3>
            </Link>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-brings-dark">CHF {product.price.toFixed(2)}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-brings-primary hover:text-brings-primary/90 hover:bg-brings-primary/10 p-1"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag size={18} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
