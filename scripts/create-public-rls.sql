-- SQL script to make the products table publicly readable
-- Copy and paste this into the Supabase SQL Editor

-- First check if RLS is enabled
SELECT relname as table_name, relrowsecurity as rls_enabled
FROM pg_class
WHERE relname = 'products';

-- Create a policy that allows anyone to select products
DROP POLICY IF EXISTS "Allow public read access" ON products;
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Enable RLS if not already enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Verify that RLS is working
SELECT COUNT(*) FROM products; 