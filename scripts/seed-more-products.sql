-- SQL script to add more products with proper images
-- Copy and paste this into the Supabase SQL Editor

-- First check if we already have products
SELECT COUNT(*) FROM products;

-- Add more products with images from the correct storage bucket
INSERT INTO products (name, price, category, description, image, agerestricted, stock) VALUES
-- Alcoholic beverages (age restricted)
('Ballantines Scotch Whisky', 24.90, 'spirits', 'Ballantines Finest Blended Scotch Whisky', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Ballantines-300x300.png', TRUE, 25),
('Jack Daniels Whiskey', 32.50, 'spirits', 'Jack Daniels Tennessee Whiskey', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Jack-Daniels-300x300.png', TRUE, 20),
('Absolut Vodka', 27.90, 'spirits', 'Absolut Vodka Original', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Absolut-Vodka-300x300.png', TRUE, 30),
('Bombay Sapphire Gin', 29.90, 'spirits', 'Bombay Sapphire London Dry Gin', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Bombay-Sapphire-300x300.png', TRUE, 25),
('Corona Extra Beer 6-pack', 12.90, 'beer', 'Corona Extra Beer 6x330ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Corona-6pack-300x300.png', TRUE, 40),

-- Soft Drinks
('Red Bull Energy Drink', 2.50, 'soft-drinks', 'Red Bull Energy Drink 250ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-RedBull-300x300.png', FALSE, 100),
('Sprite 1.5L', 2.90, 'soft-drinks', 'Sprite Lemon-Lime Soda 1.5L', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Sprite-300x300.png', FALSE, 75),
('San Pellegrino Sparkling Water', 1.90, 'soft-drinks', 'San Pellegrino Sparkling Mineral Water 1L', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-San-Pellegrino-300x300.png', FALSE, 60),

-- Snacks
('Pringles Original', 4.50, 'chips-snacks', 'Pringles Original Potato Crisps', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Pringles-300x300.png', FALSE, 45),
('Haribo Goldbären', 3.90, 'sweets', 'Haribo Goldbären Gummy Bears', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Haribo-300x300.png', FALSE, 50),
('Toblerone Chocolate', 4.95, 'sweets', 'Toblerone Swiss Milk Chocolate with Honey and Almond Nougat', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Toblerone-300x300.png', FALSE, 40),
('Lindt Excellence Dark', 3.95, 'sweets', 'Lindt Excellence Dark Chocolate 85% Cocoa', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Lindt-300x300.png', FALSE, 35),

-- Cigarettes (age restricted)
('Marlboro Red', 9.50, 'cigarettes', 'Marlboro Red Cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Marlboro-300x300.png', TRUE, 60),
('Camel Blue', 9.20, 'cigarettes', 'Camel Blue Cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Camel-300x300.png', TRUE, 50);

-- Update the existing products with better image URLs for our initial products if they're still using placeholder images
UPDATE products 
SET image = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Coca-Cola-300x300.png'
WHERE name = 'Coca-Cola Classic';

UPDATE products 
SET image = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Coca-Cola-Zero-300x300.png'
WHERE name = 'Coca Cola Zero';

UPDATE products 
SET image = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Fanta-300x300.png'
WHERE name = 'Fanta 1.5l';

UPDATE products 
SET image = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Zweifel-300x300.png'
WHERE name = 'Zweifel Paprika Chips';

UPDATE products 
SET image = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Oreo-300x300.png'
WHERE name = 'Oreo Original';

UPDATE products 
SET image = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Heineken-300x300.png'
WHERE name = 'Heineken Premium 0.5l';

UPDATE products 
SET image = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Feldschlosschen-300x300.png'
WHERE name = 'Feldschlösschen Original';

-- Verify that products were inserted
SELECT COUNT(*) FROM products; 