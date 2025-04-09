
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-brings-dark to-brings-dark/90 overflow-hidden text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Snacks & Getränk <span className="text-brings-secondary">sofort</span> zu dir glieferet
            </h1>
            <p className="text-lg text-gray-200 max-w-md">
              Alles was du für en gmüetliche Film-Abig oder spontane Party bruuchsch - direkt zu dir nach Hus bracht.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/order">
                <Button className="bg-brings-primary hover:bg-brings-primary/90 text-white px-6 py-6 rounded-xl">
                  <ShoppingBag className="mr-2" size={20} />
                  Jetzt Bstelle
                </Button>
              </Link>
              <Button variant="outline" className="border-brings-secondary text-brings-secondary hover:bg-brings-secondary/10 px-6 py-6 rounded-xl">
                Produkt Aluege
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-brings-primary/20 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1621447504864-d8686e12698c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
              alt="Snacks und Getränke" 
              className="rounded-lg shadow-xl object-cover w-full aspect-[4/3] relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 bg-brings-dark p-4 rounded-lg shadow-lg animate-fade-in z-20">
              <p className="text-brings-secondary font-bold">Schnelli Lieferig</p>
              <p className="text-sm text-gray-300">I 30 Minute bi dir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brings-primary/10 -skew-x-12 transform origin-top-right"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brings-secondary via-brings-primary to-brings-accent"></div>
    </div>
  );
};

export default HeroBanner;
