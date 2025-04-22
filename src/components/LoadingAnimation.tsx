
import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/d49bb06e-42a9-4c26-80a9-2b588559e168.png" 
          alt="Brings Logo" 
          className="h-40 animate-pulse"
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
