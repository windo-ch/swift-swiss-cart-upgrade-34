
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import PromoBanner from '../components/PromoBanner';

// Product data
const products = [
  {
    id: 1,
    name: 'Zweifel Chips Paprika',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 5.90,
    category: 'chips'
  },
  {
    id: 2,
    name: 'Coca Cola 0.5L',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 2.50,
    category: 'drinks'
  },
  {
    id: 3,
    name: 'Rivella Rot 0.5L',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 2.80,
    category: 'drinks'
  },
  {
    id: 4,
    name: 'Kägi Fret Mini',
    image: 'https://images.unsplash.com/photo-1583527853922-60e8bf9d1a3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 3.90,
    category: 'sweets'
  },
  {
    id: 5,
    name: 'Red Bull Energy Drink',
    image: 'https://images.unsplash.com/photo-1613577075905-399c90fabde7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 3.50,
    category: 'energy'
  },
  {
    id: 6,
    name: 'Zweifel Chips Nature',
    image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 5.90,
    category: 'chips'
  },
  {
    id: 7,
    name: 'Feldschlösschen Bier',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 3.90,
    category: 'alcohol'
  },
  {
    id: 8,
    name: 'Ovomaltine Schokolade',
    image: 'https://images.unsplash.com/photo-1614088685112-0e760536a695?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 2.90,
    category: 'sweets'
  },
];

// Categories
const categories = [
  { id: 'all', name: 'Alli Produkt', icon: '🛒' },
  { id: 'chips', name: 'Chips & Snacks', icon: '🍿' },
  { id: 'drinks', name: 'Getränk', icon: '🥤' },
  { id: 'sweets', name: 'Süssigkeite', icon: '🍫' },
  { id: 'alcohol', name: 'Alkohol', icon: '🍺' },
  { id: 'energy', name: 'Energy Drinks', icon: '⚡' },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Produkt sueche..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brings-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <div className="hidden md:flex items-center mr-2">
                <Filter size={18} className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">Filter:</span>
              </div>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-button whitespace-nowrap ${
                    activeCategory === category.id ? 'active' : ''
                  }`}
                >
                  <span className="mr-1">{category.icon}</span> {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="default" className="bg-brings-primary hover:bg-brings-primary/90">
                      <ShoppingBag className="mr-2" size={16} />
                      In Warechorb
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-brings-dark">CHF {product.price.toFixed(2)}</span>
                    <Button variant="ghost" size="sm" className="text-brings-primary hover:text-brings-primary/90 hover:bg-brings-primary/10 p-1">
                      <ShoppingBag size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Kei Produkt gfunde.</p>
              <p className="text-gray-400">Probier en anderi Suechi oder Filter.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
