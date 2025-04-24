-- Create products table in Supabase
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

-- Add RLS policies to allow public read access but restrict write operations
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone can read products
CREATE POLICY "Anyone can read products" ON products
  FOR SELECT USING (true);

-- Only authenticated users with specific role can modify products
CREATE POLICY "Admin users can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() IN (
    SELECT id FROM auth.users WHERE auth.users.is_admin = true
  ));

CREATE POLICY "Admin users can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated' AND auth.uid() IN (
    SELECT id FROM auth.users WHERE auth.users.is_admin = true
  ));

CREATE POLICY "Admin users can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated' AND auth.uid() IN (
    SELECT id FROM auth.users WHERE auth.users.is_admin = true
  ));

-- Create a function to update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the 'updated_at' column
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add is_admin column to auth.users if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN is_admin BOOLEAN DEFAULT false;
  END IF;
END
$$; 