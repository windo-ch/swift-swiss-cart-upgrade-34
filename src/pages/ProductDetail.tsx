
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import { Button } from '@/components/ui/button';
import ProductImage from '../components/product/ProductImage';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';
import { useProduct } from '../hooks/use-product';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { product, relatedProducts } = useProduct(id);
  
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
          <div className="mb-6">
            <Link to="/products" className="text-brings-primary hover:underline inline-flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Zrugg zu de Produkt
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductImage image={product.image} name={product.name} />
            <ProductInfo 
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
          
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
