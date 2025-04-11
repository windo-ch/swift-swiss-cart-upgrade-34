
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import PromoBanner from '../components/PromoBanner';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Product data
const products = [
  {
    id: 1,
    name: 'Zweifel Chips Paprika',
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-paprika-155g-550_600x.jpg',
    price: 5.90,
    category: 'chips'
  },
  {
    id: 2,
    name: 'Coca Cola 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/coca-cola-classic-500ml-787_600x.jpg',
    price: 2.50,
    category: 'drinks'
  },
  {
    id: 3,
    name: 'Rivella Rot 0.5L',
    image: 'https://brings-delivery.ch/cdn/shop/products/rivella-rot-500ml-787_600x.jpg',
    price: 2.80,
    category: 'drinks'
  },
  {
    id: 4,
    name: 'Kägi Fret Mini',
    image: 'https://brings-delivery.ch/cdn/shop/products/kagi-fret-mini-165g-250_600x.jpg',
    price: 3.90,
    category: 'sweets'
  },
  {
    id: 5,
    name: 'Red Bull Energy Drink',
    image: 'https://brings-delivery.ch/cdn/shop/products/red-bull-energy-drink-250ml-787_600x.jpg',
    price: 3.50,
    category: 'energy'
  },
  {
    id: 6,
    name: 'Zweifel Chips Nature',
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-nature-155g-550_600x.jpg',
    price: 5.90,
    category: 'chips'
  },
  {
    id: 7,
    name: 'Feldschlösschen Bier',
    image: 'https://brings-delivery.ch/cdn/shop/products/feldschlosschen-original-500ml-787_600x.jpg',
    price: 3.90,
    category: 'alcohol'
  },
  {
    id: 8,
    name: 'Ovomaltine Schokolade',
    image: 'https://brings-delivery.ch/cdn/shop/products/cailler-milch-1_600x.jpg',
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

// Get products from localStorage if available
const getStoredProducts = () => {
  try {
    const storedProducts = localStorage.getItem('adminProducts');
    const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
    return [...products, ...parsedProducts];
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return products;
  }
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allProducts, setAllProducts] = useState(getStoredProducts());
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const { addToCart } = useCart();
  
  // Update products when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setAllProducts(getStoredProducts());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Filter products whenever search term, category, or all products changes
  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm, activeCategory, allProducts]);

  // Handle product add to cart
  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

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
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id 
                      ? 'bg-brings-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
                      }}
                    />
                  </Link>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      variant="default" 
                      className="bg-brings-primary hover:bg-brings-primary/90"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="mr-2" size={16} />
                      In Warechorb
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-800 hover:text-brings-primary transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-brings-dark">CHF {product.price.toFixed(2)}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-brings-primary hover:text-brings-primary/90 hover:bg-brings-primary/10 p-1"
                      onClick={() => handleAddToCart(product)}
                    >
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
