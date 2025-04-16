
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Minus, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface ProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductInfo = ({ product, quantity, onQuantityChange }: ProductInfoProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
    
    toast({
      title: "Zum Warechorb hinzuegfüegt",
      description: `${quantity}x ${product.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brings-dark">{product.name}</h1>
        <p className="text-brings-primary font-semibold text-xl mt-2">CHF {product.price.toFixed(2)}</p>
      </div>
      
      <p className="text-gray-700">{product.description}</p>
      
      <div className="border-t border-b border-gray-200 py-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Gwicht/Inhalt:</span>
          <span className="font-medium">{product.weight}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Kategorie:</span>
          <span className="font-medium capitalize">{product.category}</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-800 mb-2">Zuetate:</h3>
        <p className="text-sm text-gray-600">{product.ingredients}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Anzahl:</span>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
            className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button 
            onClick={() => onQuantityChange(quantity + 1)}
            className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          className="bg-brings-primary hover:bg-brings-primary/90 text-white w-full py-6"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2" size={20} />
          In Warechorb
        </Button>
        <Button variant="outline" className="border-gray-300 hover:bg-gray-100 p-2">
          <Heart size={20} />
        </Button>
      </div>
      
      <div className="bg-brings-light p-4 rounded-lg flex items-center">
        <div className="bg-brings-secondary/20 rounded-full p-2 mr-3">
          <span className="text-xl">🚚</span>
        </div>
        <div>
          <h4 className="font-medium text-brings-dark">Schnelli Lieferig</h4>
          <p className="text-sm text-gray-600">I 30 Minute bi dir in Züri</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
