
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import ProductSearch from '../components/products/ProductSearch';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductGrid from '../components/products/ProductGrid';
import { getStoredProducts } from '../utils/product-utils';
import { Loader2 } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load products on mount
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
    
    // Listen for storage events to refresh products
    const handleStorageChange = () => {
      console.log("Storage event detected, refreshing products");
      loadProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Update category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);
  
  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchParams({ category });
  };
  
  // Filter products whenever search term, category, or all products changes
  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    
    console.log(`Filtering for category: ${activeCategory}`);
    console.log(`Found ${filtered.length} products that match category and search`);
    
    setFilteredProducts(filtered);
  }, [searchTerm, activeCategory, allProducts]);

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-brings-dark text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Üsi Produkt</h1>
            <p className="mt-2 text-gray-300">Entdeck üsi riesigi Uswahl a Snacks und Getränk</p>
          </div>
        </div>
        
        {/* Filters and search */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryFilter 
              activeCategory={activeCategory} 
              setActiveCategory={handleCategoryChange} 
            />
          </div>
          
          {/* Product grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-brings-primary mr-2" />
              <span>Produkte werden geladen...</span>
            </div>
          ) : (
            <>
              <ProductGrid products={filteredProducts} />
              
              {filteredProducts.length === 0 && !isLoading && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">Kei Produkt gfunde.</p>
                  <p className="text-gray-400">Probier en anderi Suechi oder Filter.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
