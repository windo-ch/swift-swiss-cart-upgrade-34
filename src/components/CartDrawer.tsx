
import React from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  // Sample cart items
  const cartItems = [];
  
  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart size={20} />
            <h2 className="text-lg font-medium">Your Cart</h2>
            <span className="bg-shop-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
              <ShoppingCart size={64} className="text-gray-300" />
              <p>Your cart is empty</p>
              <Button 
                onClick={onClose}
                className="bg-shop-primary hover:bg-shop-primary/90 text-white"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart items would go here */}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span className="font-medium">$0.00</span>
            </div>
            <Button className="w-full bg-shop-primary hover:bg-shop-primary/90 text-white">
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
