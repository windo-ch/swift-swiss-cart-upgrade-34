
import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/4c6b9ae0-4ef4-4856-a9f0-cc27d8537d85.png"
          alt="Brings Logo"
          className="h-80 animate-pulse"
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
