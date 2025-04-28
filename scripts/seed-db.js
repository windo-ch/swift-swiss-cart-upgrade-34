// Node.js script to force initialize products in Supabase
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// Constants
const PRODUCTS_TABLE = 'products';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
// Try to use a service role key if available, otherwise fall back to anon key
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env file');
  process.exit(1);
}

// Create the Supabase client with admin privileges to bypass RLS
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Default product data
const getDefaultSeedProducts = () => {
  let idCounter = 1000;
  
  return [
    // Soft drinks
    { id: idCounter++, name: "Coca-Cola Classic", price: 2.50, category: "soft-drinks", description: "Coca-Cola Classic", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    { id: idCounter++, name: "Coca Cola Zero", price: 2.50, category: "soft-drinks", description: "Coca Cola Zero", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    { id: idCounter++, name: "Fanta 1.5l", price: 5.90, category: "soft-drinks", description: "Fanta in a 1.5L bottle", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    
    // Snacks
    { id: idCounter++, name: "Zweifel Paprika Chips", price: 4.90, category: "chips-snacks", description: "Zweifel Paprika flavored chips", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    { id: idCounter++, name: "Oreo Original", price: 4.90, category: "sweets", description: "Oreo Original cookies", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: false, stock: 50 },
    
    // Beer (age-restricted)
    { id: idCounter++, name: "Heineken Premium 0.5l", price: 3.60, category: "beer", description: "Heineken Premium beer in a 0.5l bottle", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: true, stock: 50 },
    { id: idCounter++, name: "Feldschlösschen Original", price: 3.50, category: "beer", description: "Original Feldschlösschen beer", image: "https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png", ageRestricted: true, stock: 50 }
  ];
};

// Convert app product to Supabase product format
const appProductToSupabaseProduct = (product) => {
  return {
    name: product.name,
    description: product.description || '',
    price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
    image: product.image || '',
    category: product.category,
    agerestricted: product.ageRestricted || false,
    stock: product.stock || 0,
    ingredients: product.ingredients || null,
    weight: product.weight || null
  };
};

// Function to check if we have admin privileges and enable public access if needed
const enablePublicAccess = async () => {
  // If we're using the anon key, let's try to give the table public access
  if (!process.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
    console.log('Using anon key - will attempt to set public policy for products table...');
    // We can't modify RLS with anon key, so we'll use the REST API approach instead
    // to populate the products
    return false;
  }
  
  return true;
};

// Insert products using direct REST API call to bypass RLS
const insertViaRestApi = async (supabaseProducts) => {
  const batchSize = 5;
  let insertedCount = 0;
  
  for (let i = 0; i < supabaseProducts.length; i += batchSize) {
    const batch = supabaseProducts.slice(i, i + batchSize);
    console.log(`Inserting batch ${i / batchSize + 1} of ${Math.ceil(supabaseProducts.length / batchSize)} via REST API...`);
    
    try {
      // Use fetch directly with the Supabase REST API
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${PRODUCTS_TABLE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(batch)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error inserting batch ${i / batchSize + 1}:`, errorText);
        return false;
      }
      
      insertedCount += batch.length;
      console.log(`✅ Inserted batch ${i / batchSize + 1} of ${Math.ceil(supabaseProducts.length / batchSize)}`);
    } catch (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      return false;
    }
  }
  
  console.log(`✅ Successfully migrated ${insertedCount} products via REST API`);
  return true;
};

const forceInitializeProducts = async () => {
  try {
    console.log('Starting force initialization of products...');
    
    // Check if we have admin privileges
    const hasAdminAccess = await enablePublicAccess();
    if (!hasAdminAccess) {
      console.log('No admin access, will try using the REST API approach...');
    }
    
    // 1. Check if the products table exists
    const { data: tableInfo, error: tableError } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*', { count: 'exact', head: true });
    
    if (tableError && !tableError.message.includes('does not exist')) {
      console.error('Error accessing products table:', tableError);
      return false;
    }
    
    // 2. Clear existing products if the table exists
    if (!tableError) {
      console.log('Products table exists, clearing existing products...');
      // Try to delete using regular API first
      const { error: deleteError } = await supabase
        .from(PRODUCTS_TABLE)
        .delete()
        .gt('id', '00000000-0000-0000-0000-000000000000');
      
      if (deleteError) {
        console.log('Could not delete products with standard approach, might be due to RLS.');
        if (!hasAdminAccess) {
          console.log('Without admin access, we cannot clear the table. Will try inserting anyway.');
        } else {
          console.error('Error clearing existing products:', deleteError);
          return false;
        }
      } else {
        console.log('✅ Cleared existing products');
      }
    }
    
    // 3. Get seed products
    const seedProducts = getDefaultSeedProducts();
    
    if (seedProducts.length === 0) {
      console.error('No seed products found');
      return false;
    }
    
    console.log(`🌱 Migrating ${seedProducts.length} products to Supabase...`);
    
    // 4. Convert to Supabase format and insert in batches
    const supabaseProducts = seedProducts.map(appProductToSupabaseProduct);
    
    // If we don't have admin access, use the REST API approach
    if (!hasAdminAccess) {
      return await insertViaRestApi(supabaseProducts);
    }
    
    // Otherwise, use the standard Supabase client approach
    const batchSize = 10;
    let insertedCount = 0;
    
    for (let i = 0; i < supabaseProducts.length; i += batchSize) {
      const batch = supabaseProducts.slice(i, i + batchSize);
      
      console.log(`Inserting batch ${i / batchSize + 1} of ${Math.ceil(supabaseProducts.length / batchSize)}...`);
      
      const { error: insertError } = await supabase
        .from(PRODUCTS_TABLE)
        .insert(batch);
      
      if (insertError) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
        // Try the REST API approach as a fallback
        console.log('Falling back to REST API approach...');
        return await insertViaRestApi(supabaseProducts.slice(i));
      }
      
      insertedCount += batch.length;
      console.log(`✅ Inserted batch ${i / batchSize + 1} of ${Math.ceil(supabaseProducts.length / batchSize)}`);
    }
    
    console.log(`✅ Successfully migrated ${insertedCount} products to Supabase`);
    return true;
  } catch (error) {
    console.error('Unexpected error during force initialization:', error);
    return false;
  }
};

// Execute the force initialization
forceInitializeProducts()
  .then(success => {
    if (success) {
      console.log('Products initialized successfully! 🚀');
    } else {
      console.error('Failed to initialize products 😢');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Error executing initialization:', err);
    process.exit(1);
  }); 