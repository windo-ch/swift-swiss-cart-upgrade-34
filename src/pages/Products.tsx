
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductGrid from '../components/products/ProductGrid';
import { getStoredProducts } from '../utils/product-utils';
import { Loader2, Search } from 'lucide-react';
import { Product } from '../types/product';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { categories } from '../data/categories-data';
import { Input } from '@/components/ui/input';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = () => {
      setIsLoading(true);
      try {
        const products = getStoredProducts();
        console.log(`Loaded ${products.length} products`);
        setAllProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
    
    const handleStorageChange = () => {
      console.log("Storage event detected, refreshing products");
      loadProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchParams({ category });
  };
  
  const clearFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
    setSearchParams({});
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    console.log(`Filtering for category: ${activeCategory}, found ${filtered.length} products`);
    setFilteredProducts(filtered);
  }, [searchTerm, activeCategory, allProducts]);

  const getActiveCategoryName = () => {
    if (activeCategory === 'all') return 'Alle Produkte';
    const category = categories.find(c => c.id === activeCategory);
    return category ? category.name : 'Alle Produkte';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            <Input
              type="text"
              placeholder="Produkt sueche..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-brings-primary/20 focus:border-brings-primary"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          {(activeCategory !== 'all' || searchTerm) && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Aktive Filter:</span>
              {activeCategory !== 'all' && (
                <Badge variant="outline" className="bg-brings-primary/10 text-brings-primary">
                  {getActiveCategoryName()}
                  <button 
                    onClick={() => handleCategoryChange('all')} 
                    className="ml-1 hover:text-brings-primary/70"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="outline" className="bg-brings-primary/10 text-brings-primary">
                  Suche: {searchTerm}
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="ml-1 hover:text-brings-primary/70"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              )}
              <button 
                onClick={clearFilters}
                className="text-sm text-brings-primary hover:underline"
              >
                Alle zurücksetzen
              </button>
            </div>
          )}
        </div>
        
        <CategoryFilter 
          activeCategory={activeCategory} 
          setActiveCategory={handleCategoryChange} 
        />
        
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{getActiveCategoryName()}</h2>
            <p className="text-gray-500">{filteredProducts.length} Produkte gefunden</p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-brings-primary mr-2" />
            <span>Produkte werden geladen...</span>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
