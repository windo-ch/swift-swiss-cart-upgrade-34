
import React from 'react';
import ProductCard from './ProductCard';

// Swiss snacks and drinks
const products = [
  {
    id: '1',
    name: 'Zweifel Paprika Chips',
    price: 3.90,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80',
    category: 'Chips & Snacks',
    isNew: false
  },
  {
    id: '2',
    name: 'Rivella Rot (1L)',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Getränk',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Kambly Bretzeli',
    price: 4.20,
    image: 'https://images.unsplash.com/photo-1558745087-19465451e307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Süssigkeite',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Feldschlösschen Bier (6er)',
    price: 9.90,
    image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Alkohol',
    isNew: false
  },
  {
    id: '5',
    name: 'Red Bull Energy (4er)',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80',
    category: 'Energy Drinks',
    isFeatured: true
  },
  {
    id: '6',
    name: 'Zweifel Eckchips Nature',
    price: 3.20,
    image: 'https://images.unsplash.com/photo-1613919517761-0d9e197400e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Chips & Snacks',
    isNew: false
  },
  {
    id: '7',
    name: 'Caotina Schoggidrink',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Getränk',
    isFeatured: true
  },
  {
    id: '8',
    name: 'Monster Energy Ultra',
    price: 2.90,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Energy Drinks',
    isNew: true
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brings-dark mb-2">Beliebteste Produkt</h2>
          <p className="text-gray-600">Üsi Top-Produkt - schnell und frisch glieferet</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
