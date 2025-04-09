
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-shop-primary/10 to-shop-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shop-dark">
              Fresh Groceries Delivered to Your Door
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Shop the finest selection of fresh produce, pantry essentials, and gourmet foods with convenient delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-shop-primary hover:bg-shop-primary/90 text-white px-6 py-6">
                Shop Now
              </Button>
              <Button variant="outline" className="border-shop-primary text-shop-primary hover:bg-shop-primary/10 px-6 py-6">
                View Categories
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
              alt="Fresh groceries" 
              className="rounded-lg shadow-xl object-cover w-full aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg animate-fade-in">
              <p className="text-shop-primary font-bold">Fast Delivery</p>
              <p className="text-sm text-gray-600">Within 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
