
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useAgeVerification } from '../contexts/AgeVerificationContext';
import { Button } from '@/components/ui/button';

// Products from brings-delivery.ch
const products = [
  {
    id: '1',
    name: 'Red Bull Energy 0.25l',
    price: 2.90,
    image: 'https://brings-delivery.ch/cdn/shop/products/red-bull-energy-drink-250ml-787_600x.jpg',
    category: 'Energy Drinks',
    isNew: false,
    ageRestricted: false
  },
  {
    id: '2',
    name: 'Coca Cola 0.5l',
    price: 2.50,
    image: 'https://brings-delivery.ch/cdn/shop/products/coca-cola-classic-500ml-787_600x.jpg',
    category: 'Getränk',
    isFeatured: true,
    ageRestricted: false
  },
  {
    id: '3',
    name: 'Zweifel Chips Paprika 90g',
    price: 3.20,
    image: 'https://brings-delivery.ch/cdn/shop/products/zweifel-nature-155g-550_600x.jpg',
    category: 'Chips & Snacks',
    isFeatured: true,
    ageRestricted: false
  },
  {
    id: '4',
    name: 'Cailler Schokolade 100g',
    price: 3.50,
    image: 'https://brings-delivery.ch/cdn/shop/products/cailler-milch-1_600x.jpg',
    category: 'Süssigkeite',
    isNew: false,
    ageRestricted: false
  },
  {
    id: '5',
    name: 'Monster Energy Ultra 0.5l',
    price: 3.50,
    image: 'https://brings-delivery.ch/cdn/shop/products/monster-ultra-paradise-500ml-787_600x.jpg',
    category: 'Energy Drinks',
    isFeatured: true,
    ageRestricted: false
  },
  {
    id: '6',
    name: 'Rivella Rot 0.5l',
    price: 2.50,
    image: 'https://brings-delivery.ch/cdn/shop/products/rivella-rot-500ml-787_600x.jpg',
    category: 'Getränk',
    isNew: false,
    ageRestricted: false
  },
  {
    id: '7',
    name: 'Manner Schnitten Original 75g',
    price: 2.90,
    image: 'https://brings-delivery.ch/cdn/shop/products/manner-original-75g-837_600x.jpg',
    category: 'Süssigkeite',
    isFeatured: true,
    ageRestricted: false
  },
  {
    id: '8',
    name: 'Feldschlösschen Bier 0.5l',
    price: 2.90,
    image: 'https://brings-delivery.ch/cdn/shop/products/feldschlosschen-original-500ml-787_600x.jpg',
    category: 'Alkohol',
    isNew: true,
    ageRestricted: true
  },
  {
    id: '9',
    name: 'Appenzeller Bier 0.33l',
    price: 2.90,
    image: 'https://brings-delivery.ch/cdn/shop/products/appenzeller-quollfrisch-330ml-787_600x.jpg',
    category: 'Alkohol',
    isNew: false,
    ageRestricted: true
  },
  {
    id: '10',
    name: 'Heineken Bier 0.5l',
    price: 2.90,
    image: 'https://brings-delivery.ch/cdn/shop/products/heineken-500ml-787_600x.jpg',
    category: 'Alkohol',
    isNew: false,
    ageRestricted: true
  },
  {
    id: '11',
    name: 'Sprite 0.5l',
    price: 2.50,
    image: 'https://brings-delivery.ch/cdn/shop/products/sprite-500ml-787_600x.jpg',
    category: 'Getränk',
    isFeatured: false,
    ageRestricted: false
  },
  {
    id: '12',
    name: 'Haribo Goldbären 100g',
    price: 1.90,
    image: 'https://brings-delivery.ch/cdn/shop/products/haribo-goldbaeren-200g-550_600x.jpg',
    category: 'Süssigkeite',
    isFeatured: false,
    ageRestricted: false
  },
  {
    id: '13',
    name: 'Marlboro Zigaretten',
    price: 9.50,
    image: 'https://brings-delivery.ch/cdn/shop/products/marlboro-red-550_600x.jpg',
    category: 'Tabak',
    isFeatured: false,
    ageRestricted: true
  },
  {
    id: '14',
    name: 'Jack Daniel\'s Whiskey 0.7l',
    price: 32.90,
    image: 'https://brings-delivery.ch/cdn/shop/products/jack-daniels-07l-550_600x.jpg',
    category: 'Alkohol',
    isFeatured: true,
    ageRestricted: true
  },
  {
    id: '15',
    name: 'Mövenpick Glacé Schokolade',
    price: 7.90,
    image: 'https://brings-delivery.ch/cdn/shop/products/movenpick-feines-vanille-900ml-550_600x.jpg',
    category: 'Dessert',
    isFeatured: true,
    ageRestricted: false
  },
  {
    id: '16',
    name: 'M-Budget Energy Drink 0.5l',
    price: 0.60,
    image: 'https://brings-delivery.ch/cdn/shop/products/m-budget-energy-drink-500ml-787_600x.jpg',
    category: 'Energy Drinks',
    isFeatured: true,
    ageRestricted: false
  }
];

const FeaturedProducts = () => {
  const { isAdult } = useAgeVerification();
  
  // Filter out age-restricted products if not adult
  const filteredProducts = isAdult 
    ? products 
    : products.filter(product => !product.ageRestricted);
  
  // Only show 8 products on the featured page
  const featuredProducts = filteredProducts.slice(0, 8);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brings-dark mb-2">Beliebteste Produkt</h2>
          <p className="text-gray-600">Üsi Top-Produkt - schnell und frisch glieferet</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              isNew={product.isNew}
              isFeatured={product.isFeatured}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/products">
            <Button className="bg-brings-primary hover:bg-brings-primary/90 text-white font-medium py-2 px-6 rounded-full transition-colors">
              Alli Produkt azeige
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
