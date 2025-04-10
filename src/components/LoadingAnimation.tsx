
import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/e4d3037b-5d79-4749-a7ff-ea9a4c991cbb.png" 
          alt="Brings Logo" 
          className="h-20 animate-pulse"
        />
        <div className="mt-4 flex space-x-1">
          <div className="h-3 w-3 bg-brings-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-3 w-3 bg-brings-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-3 w-3 bg-brings-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
