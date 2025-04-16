
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { categories } from '@/data/categories-data';

interface ProductStatsProps {
  products: Product[];
  showRestricted: boolean;
  setShowRestricted: (show: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ProductStats = ({
  products,
  showRestricted,
  setShowRestricted,
  selectedCategory,
  setSelectedCategory
}: ProductStatsProps) => {
  const totalProducts = products.length;
  const restrictedProducts = products.filter(p => p.ageRestricted).length;
  const lowStockProducts = products.filter(p => (p.stock || 0) < 10).length;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge variant="outline" className="bg-blue-50 text-blue-700">
        {totalProducts} Produkte Total
      </Badge>
      <Badge 
        variant={showRestricted ? "default" : "outline"} 
        className={showRestricted ? "bg-amber-500" : "bg-amber-50 text-amber-700"} 
        onClick={() => setShowRestricted(!showRestricted)}
      >
        {restrictedProducts} 18+ Produkte
      </Badge>
      <Badge variant="outline" className="bg-red-50 text-red-700">
        {lowStockProducts} mit niedrigem Bestand
      </Badge>
      {selectedCategory !== 'all' && (
        <Badge 
          variant="default" 
          className="bg-green-600"
        >
          Filter: {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
          <button 
            className="ml-1 hover:text-white/80" 
            onClick={() => setSelectedCategory('all')}
          >
            ✕
          </button>
        </Badge>
      )}
    </div>
  );
};

export default ProductStats;
