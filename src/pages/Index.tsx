
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
import ZurichMap from '../components/ZurichMap';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main>
        <HeroBanner />
        
        {/* Interactive Zurich Map Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-4">Wähl din Kreis</h2>
              <p className="text-gray-600">Mir liefered in alli Kreis vo Züri. Wähl din Kreis us zum Bstelle.</p>
            </div>
            <ZurichMap />
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
