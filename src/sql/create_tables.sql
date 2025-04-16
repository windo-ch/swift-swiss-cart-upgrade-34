
-- This is SQL that should be executed in the Supabase SQL Editor

-- Create orders table to track user orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  delivery_address JSONB NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  estimated_delivery_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table to track items in each order
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user addresses table
CREATE TABLE IF NOT EXISTS user_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user discounts table
CREATE TABLE IF NOT EXISTS user_discounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  discount_code VARCHAR(50) NOT NULL,
  discount_percent INTEGER NOT NULL,
  is_used BOOLEAN DEFAULT false,
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own addresses" ON user_addresses
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_discounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own discounts" ON user_discounts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own discounts" ON user_discounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own discounts" ON user_discounts
  FOR UPDATE USING (auth.uid() = user_id);
