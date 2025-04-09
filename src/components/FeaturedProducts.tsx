
import React from 'react';
import ProductCard from './ProductCard';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Organic Avocado',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80',
    category: 'Fruits & Vegetables',
    isNew: true
  },
  {
    id: '2',
    name: 'Fresh Milk (1L)',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Dairy & Eggs',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Sourdough Bread',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1585478259585-579da194cd14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Bakery',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Free Range Eggs (12)',
    price: 4.29,
    image: 'https://images.unsplash.com/photo-1598965675045-45c7d5a7353f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Dairy & Eggs',
    isNew: false
  },
  {
    id: '5',
    name: 'Organic Strawberries',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80',
    category: 'Fruits & Vegetables',
    isFeatured: true
  },
  {
    id: '6',
    name: 'Italian Pasta',
    price: 2.19,
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Pantry',
    isNew: false
  },
  {
    id: '7',
    name: 'Organic Honey (500g)',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1558642891-54be180ea339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Pantry',
    isFeatured: true
  },
  {
    id: '8',
    name: 'Fresh Orange Juice (1L)',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Beverages',
    isNew: true
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-shop-dark mb-2">Featured Products</h2>
          <p className="text-gray-600">Discover our high-quality selection</p>
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
          <button className="bg-shop-primary hover:bg-shop-primary/90 text-white font-medium py-2 px-6 rounded-full transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
