
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Truck, Clock, CheckCircle2 } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, estimatedDeliveryTime } = location.state || {};

  const deliveryTime = estimatedDeliveryTime ? new Date(estimatedDeliveryTime) : new Date();
  const formattedTime = deliveryTime.toLocaleTimeString('de-CH', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle2 className="w-16 h-16 text-brings-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Merci für dini Bstellig!</h1>
            <p className="text-gray-600 mb-2">Din Bstellig isch bi üs igange und wird verarbeitet.</p>
            {orderId && (
              <p className="text-sm text-gray-500">Bstellnummere: {orderId}</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-brings-light rounded-lg">
                <Clock className="w-8 h-8 text-brings-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Gschätzti Lieferzit</h3>
                <p>{formattedTime} Uhr</p>
              </div>
              <div className="text-center p-4 bg-brings-light rounded-lg">
                <Truck className="w-8 h-8 text-brings-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Lieferstatus</h3>
                <p>I Bearbeitig</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link to="/products">
              <Button className="w-full bg-brings-primary hover:bg-brings-primary/90">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Wiiter iichaufe
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Zrugg zur Startsiite
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
