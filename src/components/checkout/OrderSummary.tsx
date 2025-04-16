
import React from 'react';
import { CartItem } from '@/contexts/CartContext';
import { Truck } from 'lucide-react';

interface OrderSummaryProps {
  cartItems: CartItem[];
  totalPrice: number;
  deliveryFee: number;
}

const OrderSummary = ({ cartItems, totalPrice, deliveryFee }: OrderSummaryProps) => {
  const orderTotal = totalPrice + deliveryFee;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Din Bstellig</h2>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center">
              <div className="w-12 h-12 border rounded overflow-hidden mr-3">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium line-clamp-1">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity} x CHF {item.price.toFixed(2)}</p>
              </div>
            </div>
            <p className="font-medium">CHF {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <span>Zwischesumme</span>
          <span>CHF {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Lieferkoste</span>
          <span>{deliveryFee === 0 ? 'Gratis' : `CHF ${deliveryFee.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t mt-3 pt-3">
          <span>Total</span>
          <span>CHF {orderTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6 bg-brings-light p-4 rounded-lg">
        <div className="flex items-start">
          <Truck className="text-brings-primary mr-3 flex-shrink-0 mt-1" size={20} />
          <div>
            <p className="font-medium">Lieferig</p>
            <p className="text-sm text-gray-600">Üsi Lieferzit isch meistens innerhalb vo 30-60 Minute.</p>
          </div>
        </div>
      </div>
      
      {deliveryFee > 0 && (
        <div className="mt-4 text-sm text-brings-primary">
          <p>Leg no für CHF {(50 - totalPrice).toFixed(2)} i Warächorb für gratis Lieferig!</p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
