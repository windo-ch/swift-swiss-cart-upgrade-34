
import React from 'react';
import { Loader2 } from 'lucide-react';

const ProductLoadingState = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-brings-primary mx-auto mb-6" />
        <p className="text-gray-500 text-lg font-medium">Produkte werden geladen...</p>
        <p className="text-gray-400 mt-2">Bitte haben Sie einen Moment Geduld.</p>
      </div>
    </div>
  );
};

export default ProductLoadingState;
