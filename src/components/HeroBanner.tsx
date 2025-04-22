
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-brings-dark to-brings-dark/90 overflow-hidden text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-[300px]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          Snacks & Getränk <span className="text-brings-secondary">sofort</span> zu dir glieferet
        </h1>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brings-primary/10 -skew-x-12 transform origin-top-right"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brings-secondary via-brings-primary to-brings-accent"></div>
    </div>
  );
};

export default HeroBanner;
