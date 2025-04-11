
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            {/* Header */}
            <div className="px-4 py-6 bg-brings-primary text-white sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">
                  Din Warächorb ({totalItems})
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-md text-white hover:text-gray-200 focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Cart content */}
            <div className="flex-1 py-6 px-4 sm:px-6">
              {cartItems.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <li key={item.id} className="py-6 flex">
                      {/* Product image */}
                      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="line-clamp-2">{item.name}</h3>
                            <p className="ml-4">CHF {(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        </div>
                        
                        <div className="flex-1 flex items-end justify-between text-sm">
                          {/* Quantity control */}
                          <div className="flex items-center border rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-l-lg text-gray-600 hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-r-lg text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Remove button */}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-brings-primary hover:text-brings-primary/80 flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Entferne
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Din Warächorb isch leer</h3>
                  <p className="text-gray-500 mb-6">Leg es paar Produkt in Warächorb.</p>
                  <Button onClick={() => setIsCartOpen(false)} className="bg-brings-primary hover:bg-brings-primary/90">
                    Wiiter shopppe
                  </Button>
                </div>
              )}
            </div>
            
            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Zwischesumme</p>
                  <p>CHF {totalPrice.toFixed(2)}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Lieferg und Mwst. wärded bim Checkout berächnet.
                  </p>
                </div>
                <div className="space-y-3">
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                    <Button className="w-full bg-brings-primary hover:bg-brings-primary/90">
                      Zur Kasse
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full border-brings-primary text-brings-primary hover:bg-brings-primary/10"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Wiiter shopppe
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-500 hover:text-gray-700"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Warächorb leere
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
