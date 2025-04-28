-- SQL script to add final batch of products (up to 64 total)
-- Copy and paste this into the Supabase SQL Editor

-- First check how many products we already have
SELECT COUNT(*) FROM products;

-- Add the final batch of products
INSERT INTO products (name, price, category, description, image, agerestricted, stock) VALUES
-- More snacks and candies
('KitKat', 2.20, 'sweets', 'KitKat Chocolate Wafer Bar', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-KitKat-300x300.png', FALSE, 75),
('Mars Bar', 1.90, 'sweets', 'Mars Chocolate Bar', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Mars-300x300.png', FALSE, 80),
('Gummy Bears', 3.50, 'sweets', 'Gummy Bears Assorted Flavors', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Gummy-Bears-300x300.png', FALSE, 70),

-- More beverages
('Nestea Peach', 2.40, 'soft-drinks', 'Nestea Peach Iced Tea 500ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Nestea-300x300.png', FALSE, 65),
('Mountain Dew', 2.50, 'soft-drinks', 'Mountain Dew Energy Soda 500ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Mountain-Dew-300x300.png', FALSE, 60),

-- More wine
('Merlot Red Wine', 12.90, 'wine', 'Merlot Red Wine 750ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Merlot-300x300.png', TRUE, 30),
('Chardonnay White Wine', 14.90, 'wine', 'Chardonnay White Wine 750ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Chardonnay-300x300.png', TRUE, 25),

-- Hygiene products
('Toothpaste', 3.90, 'hygiene', 'Mint Toothpaste 75ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Toothpaste-300x300.png', FALSE, 45),
('Shower Gel', 4.50, 'hygiene', 'Shower Gel 250ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Shower-Gel-300x300.png', FALSE, 40),
('Hand Sanitizer', 3.90, 'hygiene', 'Hand Sanitizer 100ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Hand-Sanitizer-300x300.png', FALSE, 60),

-- Verify that products were inserted
SELECT COUNT(*) FROM products; 