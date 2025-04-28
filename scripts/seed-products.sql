-- SQL script to seed products into the Supabase database
-- Copy and paste this into the Supabase SQL Editor

-- First, disable RLS for the operation
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Clear existing products
DELETE FROM products;

-- Insert seed products
INSERT INTO products (name, price, category, description, image, agerestricted, stock) VALUES
('Coca-Cola Classic', 2.50, 'soft-drinks', 'Coca-Cola Classic', 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png', FALSE, 50),
('Coca Cola Zero', 2.50, 'soft-drinks', 'Coca Cola Zero', 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png', FALSE, 50),
('Fanta 1.5l', 5.90, 'soft-drinks', 'Fanta in a 1.5L bottle', 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png', FALSE, 50),
('Zweifel Paprika Chips', 4.90, 'chips-snacks', 'Zweifel Paprika flavored chips', 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png', FALSE, 50),
('Oreo Original', 4.90, 'sweets', 'Oreo Original cookies', 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png', FALSE, 50),
('Heineken Premium 0.5l', 3.60, 'beer', 'Heineken Premium beer in a 0.5l bottle', 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png', TRUE, 50),
('Feldschlösschen Original', 3.50, 'beer', 'Original Feldschlösschen beer', 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png', TRUE, 50);

-- Make sure the products table has appropriate RLS policies
-- First, create a policy that allows anyone to select products
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Create a policy that allows authenticated users to insert products (only if needed)
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Enable RLS again but with the new policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Verify that products were inserted
SELECT COUNT(*) FROM products; 