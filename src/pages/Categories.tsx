
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import { ChevronRight, ArrowRight, ShoppingBag, Clock, Shield, Map } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { categories } from '../data/categories-data';
import { getStoredProducts } from '../utils/product-utils';
import { Product } from '../types/product';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Load products for displaying counts and popular items
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await getStoredProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // Find the currently selected category object
  const categoryDetails = categories.find(cat => cat.id === selectedCategory);
  
  // Get product count for each category
  const getCategoryProductCount = (categoryId: string) => {
    if (categoryId === 'all') return products.length;
    return products.filter(product => product.category === categoryId).length;
  };
  
  // Get popular products for a category
  const getPopularProducts = (categoryId: string, limit: number = 4) => {
    if (categoryId === 'all') return [];
    return products
      .filter(product => product.category === categoryId)
      .slice(0, limit);
  };
  
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  const handleViewAllProducts = (categoryId: string | null) => {
    navigate(`/products${categoryId && categoryId !== 'all' ? `?category=${categoryId}` : ''}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with animated background */}
        <div className="relative bg-gradient-to-r from-brings-dark to-brings-dark/90 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {categories.filter(cat => cat.id !== 'all').map((cat, index) => (
              <span 
                key={cat.id}
                className="absolute text-4xl animate-fade-in"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {cat.icon}
              </span>
            ))}
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Üsi Kategorie</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Entdeck üsi umfangrichi Uswahl a Produkt - sortiert in Kategorie für eifachs Finde.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => handleViewAllProducts(null)}
                className="bg-brings-primary hover:bg-brings-primary/90 text-white px-6 py-6 rounded-xl"
              >
                <ShoppingBag className="mr-2" size={20} />
                Alli Produkt azeige
              </Button>
              <Button 
                variant="outline" 
                className="border-brings-secondary text-brings-secondary hover:bg-brings-secondary/10 px-6 py-6 rounded-xl"
                onClick={() => navigate('/order')}
              >
                <Clock className="mr-2" size={20} />
                Sofort Bstelle
              </Button>
            </div>
          </div>
        </div>
        
        {/* Key benefits section */}
        <div className="bg-brings-light py-8 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center p-4">
                <Clock size={24} className="text-brings-primary mr-3" />
                <div>
                  <h3 className="font-semibold text-brings-dark">30-60 Minute Lieferig</h3>
                  <p className="text-sm text-gray-600">Schnelli Lieferig zu dir nach Hus</p>
                </div>
              </div>
              <div className="flex items-center p-4">
                <Map size={24} className="text-brings-primary mr-3" />
                <div>
                  <h3 className="font-semibold text-brings-dark">Lokali Lieferig</h3>
                  <p className="text-sm text-gray-600">Im ganze Stadtgebiet verfügbar</p>
                </div>
              </div>
              <div className="flex items-center p-4">
                <Shield size={24} className="text-brings-primary mr-3" />
                <div>
                  <h3 className="font-semibold text-brings-dark">Altersverifikation</h3>
                  <p className="text-sm text-gray-600">Sicheri Lieferig vo Alkohol & Tabak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
              {/* Category Sidebar */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-brings-dark mb-6">Üsi Kategorie</h2>
                <div className="space-y-2">
                  {categories.filter(cat => cat.id !== 'all').map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                        selectedCategory === category.id 
                          ? 'bg-brings-primary text-white shadow-md' 
                          : 'bg-gray-100 hover:bg-gray-200 text-brings-dark'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs px-2 py-1 rounded-full bg-white/20">
                          {isLoading ? '...' : getCategoryProductCount(category.id)}
                        </span>
                        {selectedCategory === category.id && (
                          <ChevronRight className="ml-2" size={18} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category Content */}
              <div className="md:col-span-5">
                <Card className="overflow-hidden border-none shadow-md">
                  {selectedCategory ? (
                    <div className="animate-fade-in">
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-brings-dark to-brings-dark/70 flex items-center">
                          <div className="p-8 text-white">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-4xl">{categoryDetails?.icon}</span>
                              <h2 className="text-3xl font-bold">{categoryDetails?.name}</h2>
                            </div>
                            <p className="text-gray-200 max-w-lg">
                              {categoryDetails?.name} - Mir bringed dir {categoryDetails?.name.toLowerCase()} direkt zu dir nach Hus, innerhalb vo 30-60 Minute.
                            </p>
                            <Button 
                              className="mt-6 bg-brings-secondary text-brings-dark hover:bg-brings-secondary/90"
                              onClick={() => handleViewAllProducts(selectedCategory)}
                            >
                              Alli {categoryDetails?.name} azeige
                              <ArrowRight size={16} className="ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brings-dark mb-4">Beliebteste {categoryDetails?.name}</h3>
                        {isLoading ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-lg"></div>
                            ))}
                          </div>
                        ) : (
                          <>
                            {getPopularProducts(selectedCategory).length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {getPopularProducts(selectedCategory).map((product) => (
                                  <Link 
                                    key={product.id.toString()} 
                                    to={`/product/${product.id}`}
                                    className="flex items-center bg-white p-4 rounded-lg border border-gray-100 hover:border-brings-primary/30 hover:shadow-sm transition-all group"
                                  >
                                    <div className="w-16 h-16 mr-4 overflow-hidden rounded-md flex-shrink-0">
                                      <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).onerror = null;
                                          (e.target as HTMLImageElement).src = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-product-placeholder.png';
                                        }}
                                      />
                                    </div>
                                    <div className="flex-grow">
                                      <h4 className="font-medium text-brings-dark group-hover:text-brings-primary transition-colors">{product.name}</h4>
                                      <div className="flex justify-between items-center mt-1">
                                        <span className="font-bold text-brings-dark">CHF {product.price.toFixed(2)}</span>
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          className="text-brings-primary p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                          <ShoppingBag size={16} />
                                        </Button>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-gray-500">Kei Produkt gfunde für die Kategorie.</p>
                              </div>
                            )}
                          </>
                        )}
                      </CardContent>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16">
                      <span className="text-6xl mb-6">🔍</span>
                      <h3 className="text-2xl font-bold text-brings-dark mb-3">Wähl e Kategorie</h3>
                      <p className="text-gray-500 max-w-md mb-8">
                        Wähl e Kategorie us de Liste links zum meh über üsi Produkt erfahre.
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => handleViewAllProducts(null)}
                        className="border-brings-primary text-brings-primary hover:bg-brings-primary/5"
                      >
                        Alli Produkt azeige
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Categories Grid */}
        <div className="py-16 bg-brings-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-brings-dark text-center mb-12">Populäri Kategorie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.filter(cat => cat.id !== 'all').slice(0, 6).map((category) => {
                const productCount = getCategoryProductCount(category.id);
                
                return (
                  <Card 
                    key={category.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md group"
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-r from-brings-dark to-brings-dark/90">
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-[120px] text-white">{category.icon}</span>
                      </div>
                      <div className="absolute inset-0 flex items-end">
                        <div className="p-6 text-white">
                          <h3 className="text-2xl font-bold flex items-center">
                            <span className="text-3xl mr-2">{category.icon}</span>
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">{productCount} Produkt</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-brings-primary/10 text-brings-primary">
                          30-60 min Lieferig
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-brings-primary text-brings-primary hover:bg-brings-primary/5 mt-2"
                        onClick={() => navigate(`/products?category=${category.id}`)}
                      >
                        Alli {category.name} azeige
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/products">
                <Button size="lg" className="bg-brings-primary hover:bg-brings-primary/90">
                  Alli Produkt azeige
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
