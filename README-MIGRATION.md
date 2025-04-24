# Swiss Cart Migration to Supabase

This document outlines the implementation of migrating product data from localStorage to Supabase.

## Migration Overview

The migration process involves these key components:

1. **Database Structure**: Created a products table in Supabase with appropriate fields and RLS policies
2. **Data Migration**: Implemented utilities to seed product data from localStorage to Supabase
3. **Service Layer**: Built a service layer to interface with Supabase products
4. **Type Adapters**: Created adapter functions to convert between app and Supabase product formats
5. **UI Integration**: Updated UI components to use the new Supabase data source

## Implementation Steps

### 1. Database Schema

Created a Supabase products table with the following structure:

```sql
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  is_age_restricted BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  inventory_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. TypeScript Types

Added TypeScript interfaces for Supabase products:

```typescript
export type ProductInsert = {
  product_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  is_age_restricted: boolean;
  is_featured?: boolean;
  inventory_count?: number;
}

export type Product = ProductInsert & {
  id: string;
  created_at: string;
  updated_at: string;
}
```

### 3. Service Layer

Created a service layer to handle product operations with Supabase:

```typescript
// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });
  
  if (error) throw error;
  return data || [];
};

// More service functions for CRUD operations...
```

### 4. Migration Utilities

Built utilities to migrate existing products:

```typescript
export const initializeSupabaseProducts = async (): Promise<boolean> => {
  // Check if products already exist in Supabase
  const { count } = await supabase
    .from(PRODUCTS_TABLE)
    .select('*', { count: 'exact', head: true });
  
  // If no products, seed from localStorage
  if (count === 0) {
    const seedProducts = getSeedProducts();
    const supabaseProducts = seedProducts.map(convertToSupabaseProduct);
    
    // Insert products in batches
    for (let i = 0; i < supabaseProducts.length; i += batchSize) {
      const batch = supabaseProducts.slice(i, i + batchSize);
      await supabase.from(PRODUCTS_TABLE).insert(batch);
    }
  }
  
  return true;
};
```

### 5. React Hooks

Created React hooks for consuming the product data:

```typescript
export const useProducts = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize products if needed
  useEffect(() => {
    initializeProducts().then(() => setIsInitialized(true));
  }, []);
  
  // Fetch products using React Query
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: isInitialized,
  });
  
  // Helper functions for filtering products...
  
  return {
    products: products || [],
    isLoading,
    isError,
    // ...other properties and methods
  };
};
```

## Next Steps

Now that the product data is migrated to Supabase, the next priorities are:

1. **Inventory Tracking**: Add real-time inventory management
2. **Order Management**: Enhance the order system for delivery personnel
3. **Age Verification**: Strengthen security for age-restricted products

## Environment Setup

The application requires the following environment variables in `.env.local`:

```
VITE_SUPABASE_URL=https://zbvdlkfnpufqfhrptfhz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpidmRsa2ZucHVmcWZocnB0Zmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3OTQ2OTcsImV4cCI6MjA2MDM3MDY5N30.ouOInVDp6BggZp_SxZBIV2eAVZBvWR2w-e8cZWu78Fk
```

### Supabase Client Configuration

The Supabase client is configured in `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Using Vite's environment variable syntax
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### Basic Query Example

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      
      if (data?.length > 0) {
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name} - CHF {product.price}</div>
      ))}
    </div>
  );
}
```

