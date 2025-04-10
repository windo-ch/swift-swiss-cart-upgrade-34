
import React from 'react';
import ProductCard from './ProductCard';

// Products from brings-delivery.ch
const products = [
  {
    id: '1',
    name: 'Red Bull Energy 0.25l',
    price: 2.90,
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80',
    category: 'Energy Drinks',
    isNew: false
  },
  {
    id: '2',
    name: 'Coca Cola 0.5l',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Getränk',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Zweifel Chips Paprika 90g',
    price: 3.20,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80',
    category: 'Chips & Snacks',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Cailler Schokolade 100g',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1623428454614-abaf7c039c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Süssigkeite',
    isNew: false
  },
  {
    id: '5',
    name: 'Monster Energy Ultra 0.5l',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Energy Drinks',
    isFeatured: true
  },
  {
    id: '6',
    name: 'Rivella Rot 0.5l',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Getränk',
    isNew: false
  },
  {
    id: '7',
    name: 'Manner Schnitten Original 75g',
    price: 2.90,
    image: 'https://images.unsplash.com/photo-1558745087-19465451e307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Süssigkeite',
    isFeatured: true
  },
  {
    id: '8',
    name: 'Feldschlösschen Bier 0.5l',
    price: 2.90,
    image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Alkohol',
    isNew: true
  },
  {
    id: '9',
    name: 'Appenzeller Bier 0.33l',
    price: 2.90,
    image: 'https://images.unsplash.com/photo-1608270586920-248521c07eff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Alkohol',
    isNew: false
  },
  {
    id: '10',
    name: 'Eichhof Bier 0.5l',
    price: 2.90,
    image: 'https://images.unsplash.com/photo-1608270586920-248521c07eff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Alkohol',
    isNew: false
  },
  {
    id: '11',
    name: 'Sprite 0.5l',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Getränk',
    isFeatured: false
  },
  {
    id: '12',
    name: 'Haribo Goldbären 100g',
    price: 1.90,
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Süssigkeite',
    isFeatured: false
  }
];

const FeaturedProducts = () => {
  // Only show 8 products on the featured page
  const featuredProducts = products.slice(0, 8);
  
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
          <button className="bg-brings-primary hover:bg-brings-primary/90 text-white font-medium py-2 px-6 rounded-full transition-colors">
            Alli Produkt azeige
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
