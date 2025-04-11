
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronLeft, Minus, Plus, Heart } from 'lucide-react';
import PromoBanner from '../components/PromoBanner';
import { useCart } from '../contexts/CartContext';

// Product data - this would normally come from an API
const products = [
  {
    id: '1',
    name: 'Zweifel Chips Paprika',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 5.90,
    category: 'chips',
    description: 'Die beliebte Zweifel Chips mit Paprika-Gschmack. Perfekt für de Film-Abig oder es gemütlichs Zämme-Sitze mit Fründe.',
    weight: '175g',
    ingredients: 'Kartoffeln, Sonnenblumenöl, Paprika-Gewürz (Paprika, Salz, Zucker, Gewürze, Geschmacksverstärker: Mononatriumglutamat, Hefeextrakt), Speisesalz.'
  },
  {
    id: '2',
    name: 'Coca Cola 0.5L',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 2.50,
    category: 'drinks',
    description: 'Die klassischi Coca-Cola. Erfrischend und perfekt für unterwegs.',
    weight: '500ml',
    ingredients: 'Wasser, Zucker, Kohlensäure, Farbstoff E150d, Säuerungsmittel Phosphorsäure, natürliches Aroma, Koffein.'
  },
  {
    id: '3',
    name: 'Rivella Rot 0.5L',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 2.80,
    category: 'drinks',
    description: 'Rivella Rot - Das Original. Das beliebte Schwizer Getränk us Milchserum.',
    weight: '500ml',
    ingredients: 'Wasser, Milchserum, Zucker, Kohlensäure, Säuerungsmittel: Zitronensäure, Aromen.'
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Find the product by id
  const product = products.find(p => p.id === id);
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      // Add product to cart with quantity
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        });
      }
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center flex-grow">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Produkt nöd gfunde</h1>
          <p className="text-gray-600 mb-8">S'tuet üs leid, aber mir händ das Produkt leider nöd gfunde.</p>
          <Link to="/products">
            <Button>Zrugg zu de Produkt</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/products" className="text-brings-primary hover:underline inline-flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Zrugg zu de Produkt
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            {/* Product details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-brings-dark">{product.name}</h1>
                <p className="text-brings-primary font-semibold text-xl mt-2">CHF {product.price.toFixed(2)}</p>
              </div>
              
              <p className="text-gray-700">{product.description}</p>
              
              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Gwicht/Inhalt:</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Kategorie:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Zuetate:</h3>
                <p className="text-sm text-gray-600">{product.ingredients}</p>
              </div>
              
              {/* Quantity selector */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Anzahl:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Add to cart button */}
              <div className="flex gap-3">
                <Button 
                  className="bg-brings-primary hover:bg-brings-primary/90 text-white w-full py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  In Warechorb
                </Button>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-100 p-2">
                  <Heart size={20} />
                </Button>
              </div>
              
              {/* Fast delivery note */}
              <div className="bg-brings-light p-4 rounded-lg flex items-center">
                <div className="bg-brings-secondary/20 rounded-full p-2 mr-3">
                  <span className="text-xl">🚚</span>
                </div>
                <div>
                  <h4 className="font-medium text-brings-dark">Schnelli Lieferig</h4>
                  <p className="text-sm text-gray-600">I 30 Minute bi dir in Züri</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
