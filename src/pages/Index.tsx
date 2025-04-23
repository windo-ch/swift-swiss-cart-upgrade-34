
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialSection from '../components/TestimonialSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import ZurichMap from '../components/ZurichMap';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  
  const handleDistrictSelect = (district: string) => {
    toast.success(`Kreis ${district.replace('kreis', '')} ausgewählt`);
    navigate(`/order?district=${district}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroBanner />
        
        {/* Interactive Zurich Map Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h1 className="text-4xl font-bold mb-0">Wähl din Kreis</h1>
            </div>
            <div className="border border-brings-primary/20 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
              <ZurichMap onSelectDistrict={handleDistrictSelect} />
            </div>
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
