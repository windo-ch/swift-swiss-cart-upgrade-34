
import { Product } from '../types/product';

export const initializeAdminProducts = (): void => {
  // Check if we already have admin products
  const existingProducts = localStorage.getItem('adminProducts');
  if (existingProducts && JSON.parse(existingProducts).length > 0) {
    console.log("Admin products already exist, not initializing sample data");
    return;
  }

  // Sample admin products for demonstration
  const sampleAdminProducts: Product[] = [
    {
      id: 'admin-1681234567890',
      name: 'Bio Mountain Water',
      category: 'drinks',
      price: 2.90,
      description: 'Pure mountain spring water in a recyclable bottle',
      weight: '500ml',
      ingredients: 'Natural mountain spring water',
      image: 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
      ageRestricted: false
    },
    {
      id: 'admin-1681234567891',
      name: 'Organic Trail Mix',
      category: 'snacks',
      price: 5.90,
      description: 'Premium mix of nuts, seeds and dried fruits',
      weight: '200g',
      ingredients: 'Almonds, cashews, walnuts, pumpkin seeds, cranberries, raisins',
      image: 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
      ageRestricted: false
    }
  ];

  // Store the sample admin products
  localStorage.setItem('adminProducts', JSON.stringify(sampleAdminProducts));
  console.log("Initialized sample admin products:", sampleAdminProducts.length);
};
