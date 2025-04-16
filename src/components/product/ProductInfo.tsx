
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Shield, AlertCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
  quantity?: number;
  onQuantityChange?: React.Dispatch<React.SetStateAction<number>>;
}

const ProductInfo = ({ product, quantity = 1, onQuantityChange }: ProductInfoProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // If quantity prop is provided, add that many items, otherwise just add one
    const quantityToAdd = quantity || 1;
    
    for (let i = 0; i < quantityToAdd; i++) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (onQuantityChange && newQuantity >= 1) {
      onQuantityChange(newQuantity);
    }
  };

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock < 10;

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.ageRestricted && (
            <div className="bg-brings-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Shield size={12} className="mr-1" />
              18+
            </div>
          )}
        </div>
        <p className="text-gray-500 mt-1">{product.weight}</p>
      </div>

      <div className="text-2xl font-bold text-brings-primary">
        CHF {product.price.toFixed(2)}
      </div>

      <div className="space-y-1">
        {isOutOfStock ? (
          <div className="inline-flex items-center justify-center bg-red-100 text-red-800 px-3 py-1 rounded">
            <AlertCircle size={16} className="mr-2" />
            Nümme verfügbar
          </div>
        ) : isLowStock ? (
          <div className="inline-flex items-center justify-center bg-orange-100 text-orange-800 px-3 py-1 rounded">
            <AlertCircle size={16} className="mr-2" />
            Nur no {product.stock} verfügbar
          </div>
        ) : product.stock !== undefined ? (
          <div className="inline-flex items-center justify-center bg-green-100 text-green-800 px-3 py-1 rounded">
            {product.stock} verfügbar
          </div>
        ) : null}
      </div>

      {onQuantityChange && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Menge:</span>
          <div className="flex items-center">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 rounded-full p-0"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isOutOfStock}
            >
              -
            </Button>
            <span className="mx-3 w-8 text-center">{quantity}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 rounded-full p-0"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isOutOfStock || (product.stock !== undefined && quantity >= product.stock)}
            >
              +
            </Button>
          </div>
        </div>
      )}

      <div className="border-t border-b py-4 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Beschribig</h3>
          <p className="text-gray-600 mt-1">{product.description}</p>
        </div>

        {product.ingredients && (
          <div>
            <h3 className="text-lg font-medium">Zuetate</h3>
            <p className="text-gray-600 mt-1">{product.ingredients}</p>
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button 
          className="w-full bg-brings-primary hover:bg-brings-primary/90"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          <ShoppingBag className="mr-2" size={18} />
          {isOutOfStock ? 'Nümme verfügbar' : 'In Warechorb'}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
