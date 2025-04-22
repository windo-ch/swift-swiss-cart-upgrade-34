
import React from 'react';
import { Loader2 } from 'lucide-react';

const ProductLoadingState = () => {
  return (
    <div className="text-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-brings-primary mx-auto mb-4" />
      <p className="text-gray-500 text-lg">Produkte werden geladen...</p>
    </div>
  );
};

export default ProductLoadingState;
