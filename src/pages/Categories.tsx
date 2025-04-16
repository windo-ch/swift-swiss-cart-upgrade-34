import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const categories = [
  { 
    id: 'chips', 
    name: 'Chips & Snacks', 
    icon: '🍿', 
    description: 'Knusprigi Chips, Nachos, Popcorn und ander Snacks für Film-Abig oder Party',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    products: ['Zweifel Chips Nature', 'Zweifel Chips Paprika', 'Doritos Nacho Cheese', 'M&Ms']
  },
  { 
    id: 'drinks', 
    name: 'Getränk', 
    icon: '🥤', 
    description: 'Erfrischi Getränk für jedä Gschmack - vo Cola bis Ice Tea',
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    products: ['Coca-Cola', 'Sprite', 'Fanta', 'Rivella Rot', 'Rivella Blau']
  },
  { 
    id: 'sweets', 
    name: 'Süssigkeite', 
    icon: '🍫', 
    description: 'Schoggistängeli, Gummibärli und anderi süessi Versuechige',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    products: ['Toblerone', 'Cailler Schokolade', 'Haribo Goldbären', 'Sugus', 'Milka']
  },
  { 
    id: 'alcohol', 
    name: 'Alkohol', 
    icon: '🍺', 
    description: 'Bier, Win und Spirituose für spontani Fiirabigdrinks',
    image: 'https://images.unsplash.com/photo-1574664456531-3f8334d1a86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    products: ['Feldschlösschen Bier', 'Eichhof Lager', 'Heineken', 'Smirnoff Vodka']
  },
  { 
    id: 'energy', 
    name: 'Energy Drinks', 
    icon: '⚡', 
    description: 'Energy Drinks für di Extra-Portion Energie für die lange Nächt',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    products: ['Red Bull', 'Monster Energy', 'Rockstar Energy']
  },
  { 
    id: 'party', 
    name: 'Party Supplies', 
    icon: '🎉', 
    description: 'Alles für spontani Partys - vo Glässer bis Serviette',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    products: ['Plastikbecher', 'Papierservietten', 'Strohhalme', 'Eiswürfel']
  },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Find the currently selected category object
  const activeCategory = categories.find(cat => cat.id === selectedCategory);
  
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-brings-dark text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Alli Kategorie</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Entdeck üsi umfangrichi Uswahl a Produkt - sortiert in Kategorie für eifachs Finde.
            </p>
          </div>
        </div>
        
        {/* Categories */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
              {/* Category Sidebar */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-brings-dark mb-6">Kategorie</h2>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center p-4 rounded-lg transition-all ${
                      selectedCategory === category.id 
                        ? 'bg-brings-primary text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-brings-dark'
                    }`}
                  >
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                    {selectedCategory === category.id && (
                      <ChevronRight className="ml-auto" size={18} />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Category Content */}
              <div className="md:col-span-5 bg-brings-light rounded-xl p-6">
                {selectedCategory ? (
                  <div className="animate-fade-in">
                    <div className="relative h-48 overflow-hidden rounded-lg mb-6">
                      <img 
                        src={activeCategory?.image} 
                        alt={activeCategory?.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brings-dark/70 to-transparent flex items-end">
                        <div className="p-6">
                          <span className="text-3xl mb-2">{activeCategory?.icon}</span>
                          <h2 className="text-2xl font-bold text-white">{activeCategory?.name}</h2>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-8">
                      {activeCategory?.description}
                    </p>
                    
                    <h3 className="text-lg font-bold text-brings-dark mb-4">Populäri Produkt in {activeCategory?.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeCategory?.products.map((product, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <p className="font-medium">{product}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Link to={`/products?category=${selectedCategory}`} className="inline-flex items-center bg-brings-primary text-white px-6 py-3 rounded-lg hover:bg-brings-primary/90 transition-colors">
                        Alli {activeCategory?.name} azeige
                        <ChevronRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <span className="text-5xl mb-4">🔍</span>
                    <h3 className="text-xl font-bold text-brings-dark mb-2">Wähl e Kategorie</h3>
                    <p className="text-gray-500 max-w-md">
                      Wähl e Kategorie us de Liste links zum meh über üsi Produkt erfahre.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Categories */}
        <div className="py-16 bg-brings-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-brings-dark text-center mb-12">Top Kategorie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 3).map((category) => (
                <div key={category.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{category.icon}</span>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Link 
                      to={`/products?category=${category.id}`}
                      className="text-brings-primary hover:text-brings-primary/80 font-medium inline-flex items-center"
                    >
                      Jetzt entdecke
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
