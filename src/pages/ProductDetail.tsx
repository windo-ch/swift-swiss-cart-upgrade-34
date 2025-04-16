import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronLeft, Minus, Plus, Heart } from 'lucide-react';
import PromoBanner from '../components/PromoBanner';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Product, products as dataProducts } from '../data/products';

// Extend product type for admin products
interface ExtendedProduct extends Product {
  ingredients: string;
  weight: string;
  description?: string;
}

// Get complete product list including admin-added products
const getAllProducts = (): ExtendedProduct[] => {
  try {
    const storedProducts = localStorage.getItem('adminProducts');
    const adminProducts = storedProducts ? JSON.parse(storedProducts) : [];
    
    // Map admin products to ensure they have all required fields
    const formattedAdminProducts = adminProducts.map((product: any) => ({
      ...product,
      ingredients: product.ingredients || 'Keine Angaben zu Zutaten verfügbar.',
      weight: product.weight || 'Keine Angaben zum Gewicht verfügbar.'
    }));
    
    // Create a complete product list from both data sources
    // Convert data product IDs to strings to match admin products
    const convertedDataProducts = dataProducts.map(product => ({
      ...product,
      id: product.id.toString(),
      ingredients: product.ingredients || 'Kartoffeln, Sonnenblumenöl, Gewürze, Salz.',
      weight: product.weight || '100g'
    }));
    
    return [...convertedDataProducts, ...formattedAdminProducts];
  } catch (error) {
    console.error('Error loading products:', error);
    return dataProducts.map(product => ({
      ...product,
      id: product.id.toString(),
      ingredients: product.ingredients || 'Keine Angaben zu Zutaten verfügbar.',
      weight: product.weight || 'Keine Angaben zum Gewicht verfügbar.'
    }));
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Initialize products from all sources
  useEffect(() => {
    setProducts(getAllProducts());
  }, []);
  
  // Find the product by id
  const product = products.find(p => p.id.toString() === id);
  
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
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        });
      }
      
      // Show toast notification
      toast({
        title: "Zum Warechorb hinzuegfüegt",
        description: `${quantity}x ${product.name}`,
      });
    }
  };
  
  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id.toString() !== id)
    .slice(0, 4);
  
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
                }}
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
          
          {/* Related products section */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-brings-dark mb-6">Das chönt dir au gfalle</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Link 
                    key={relatedProduct.id} 
                    to={`/product/${relatedProduct.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-40">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800">{relatedProduct.name}</h3>
                      <p className="font-bold text-brings-primary mt-1">CHF {relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
