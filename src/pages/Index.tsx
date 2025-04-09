
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
import { ShoppingBag } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main>
        <HeroBanner />
        
        {/* Start Order Button */}
        <div className="py-8 bg-shop-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-shop-dark mb-4">Ready to place your order?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Fresh groceries delivered directly to your home in Zürich. Select your district and start shopping now!</p>
            <Link to="/order">
              <Button size="lg" className="bg-shop-primary hover:bg-shop-primary/90">
                <ShoppingBag className="mr-2" size={18} />
                Start Your Order
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
