
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialSection from '../components/TestimonialSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Clock, MapPin } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main>
        <HeroBanner />
        
        {/* Features */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-brings-light p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-brings-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock size={32} className="text-brings-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">30 Minute Lieferig</h3>
                <p className="text-gray-600">Dini Lieblings-Snacks und Getränk chömmed schnell zu dir.</p>
              </div>
              
              <div className="bg-brings-light p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-brings-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin size={32} className="text-brings-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Ganz Züri</h3>
                <p className="text-gray-600">Mir liefered in alli Kreis vo de Stadt Züri.</p>
              </div>
              
              <div className="bg-brings-light p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-brings-accent/10 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag size={32} className="text-brings-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">Eifach zum Bstelle</h3>
                <p className="text-gray-600">Wenigi Klicks und dini Produkt sind unterwägs zu dir.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Start Order Button */}
        <div className="py-16 bg-gradient-to-r from-brings-dark to-brings-dark/90 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready für dini Bstellig?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Snacks und Getränk direkt zu dir nach Hus in Züri. Wähl din Kreis und start mit shoppe!</p>
            <Link to="/order">
              <Button size="lg" className="bg-brings-primary hover:bg-brings-primary/90 text-white px-8 py-6 rounded-xl text-lg">
                <ShoppingBag className="mr-2" size={20} />
                Jetzt Bstelle
              </Button>
            </Link>
          </div>
        </div>
        
        <CategorySection />
        <FeaturedProducts />
        <TestimonialSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
