
import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/7dd740a9-78e5-46d0-be44-ac092b1e536d.png"
          alt="Brings Logo"
          className="h-[120px] animate-pulse"
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
