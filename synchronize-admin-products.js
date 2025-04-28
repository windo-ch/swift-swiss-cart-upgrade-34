// This file synchronizes the products in localStorage with the products in the database
// Run this in the browser console after executing the SQL script in Supabase

/**
 * Synchronizes the admin products in localStorage with the products from the Supabase database
 */
const syncAdminProductsWithDatabase = async () => {
  console.log('Starting product synchronization...');
  
  try {
    // Fetch products from the database
    const response = await fetch('/api/products');
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status} ${response.statusText}`);
    }
    
    const products = await response.json();
    
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('No products returned from API or invalid format');
    }
    
    console.log(`Successfully fetched ${products.length} products from the database`);
    
    // Convert database products to the expected format for localStorage
    const adminProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      image: product.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
      ageRestricted: product.agerestricted || false,
      stock: product.stock || 50
    }));
    
    // Store the products in localStorage
    localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
    
    console.log(`Successfully updated adminProducts in localStorage with ${adminProducts.length} products.`);
    console.log('Product synchronization complete! Refresh the page to see the changes.');
    
    // Return the count for confirmation
    return {
      success: true,
      count: adminProducts.length,
      message: 'Products successfully synchronized'
    };
  } catch (error) {
    console.error('Error synchronizing products:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to synchronize products'
    };
  }
};

// Execute the synchronization
syncAdminProductsWithDatabase()
  .then(result => {
    if (result.success) {
      console.log(`✅ ${result.message} - ${result.count} products updated.`);
    } else {
      console.error(`❌ ${result.message}: ${result.error}`);
    }
  });

/**
 * Paste this into the browser console to manually trigger a sync:
 * 
 * localStorage.removeItem('adminProducts');
 * 
 * Then, refresh the page and run:
 * 
 * fetch('/api/products')
 *   .then(r => r.json())
 *   .then(products => {
 *     const adminProducts = products.map(p => ({
 *       id: p.id,
 *       name: p.name,
 *       price: p.price,
 *       category: p.category,
 *       description: p.description || '',
 *       image: p.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
 *       ageRestricted: p.agerestricted || false,
 *       stock: p.stock || 50
 *     }));
 *     localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
 *     alert(`Synchronized ${adminProducts.length} products!`);
 *   })
 *   .catch(err => alert(`Error: ${err.message}`));
 */ 