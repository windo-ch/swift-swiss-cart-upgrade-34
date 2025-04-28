-- SQL script to add even more products (up to 64 total)
-- Copy and paste this into the Supabase SQL Editor

-- First check how many products we already have
SELECT COUNT(*) FROM products;

-- Add more products with images from the correct storage bucket
INSERT INTO products (name, price, category, description, image, agerestricted, stock) VALUES
-- More Soft drinks
('Evian Water 1L', 1.80, 'soft-drinks', 'Evian Natural Mineral Water 1L', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Evian-300x300.png', FALSE, 100),
('Valser Sparkling 1L', 1.95, 'soft-drinks', 'Valser Sparkling Mineral Water 1L', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Valser-300x300.png', FALSE, 90),
('Pepsi Max 500ml', 2.20, 'soft-drinks', 'Pepsi Max No Sugar 500ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Pepsi-Max-300x300.png', FALSE, 80),
('Ice Tea Lemon 500ml', 2.30, 'soft-drinks', 'Ice Tea Lemon 500ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Ice-Tea-300x300.png', FALSE, 75),
('Monster Energy 500ml', 3.50, 'soft-drinks', 'Monster Energy Drink 500ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Monster-300x300.png', FALSE, 70),
('Dr Pepper 330ml', 2.20, 'soft-drinks', 'Dr Pepper Soda 330ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Dr-Pepper-300x300.png', FALSE, 60),
('Rivella Red 500ml', 2.50, 'soft-drinks', 'Rivella Red Swiss Soft Drink 500ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Rivella-300x300.png', FALSE, 65),

-- More Beer and Alcohol
('Budweiser 330ml', 2.90, 'beer', 'Budweiser Beer 330ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Budweiser-300x300.png', TRUE, 55),
('Guinness 440ml', 3.80, 'beer', 'Guinness Draught 440ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Guinness-300x300.png', TRUE, 45),
('Smirnoff Ice 275ml', 3.90, 'beer', 'Smirnoff Ice Original 275ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Smirnoff-Ice-300x300.png', TRUE, 50),
('Bacardi Carta Blanca', 22.90, 'spirits', 'Bacardi Carta Blanca White Rum', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Bacardi-300x300.png', TRUE, 30),
('Johnnie Walker Red', 25.90, 'spirits', 'Johnnie Walker Red Label Scotch Whisky', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Johnnie-Walker-300x300.png', TRUE, 25),
('Jägermeister 500ml', 19.90, 'spirits', 'Jägermeister Herbal Liqueur 500ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Jagermeister-300x300.png', TRUE, 35),
('Grey Goose Vodka', 39.90, 'spirits', 'Grey Goose Vodka Premium', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Grey-Goose-300x300.png', TRUE, 20),
('Aperol 700ml', 19.90, 'spirits', 'Aperol Aperitivo 700ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Aperol-300x300.png', TRUE, 30),
('Campari 700ml', 22.90, 'spirits', 'Campari Bitter 700ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Campari-300x300.png', TRUE, 25),
('Hendricks Gin', 39.90, 'spirits', 'Hendrick''s Gin Premium', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Hendricks-300x300.png', TRUE, 20),

-- More Snacks
('Lays Classic Chips', 3.50, 'chips-snacks', 'Lay''s Classic Potato Chips', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Lays-300x300.png', FALSE, 60),
('Doritos Nacho Cheese', 3.90, 'chips-snacks', 'Doritos Nacho Cheese Flavored Tortilla Chips', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Doritos-300x300.png', FALSE, 55),
('Peanuts Salted', 2.90, 'chips-snacks', 'Salted Peanuts 200g', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Peanuts-300x300.png', FALSE, 70),
('Popcorn Sweet', 3.20, 'chips-snacks', 'Sweet Popcorn 100g', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Popcorn-300x300.png', FALSE, 65),
('M&Ms Chocolate', 2.90, 'sweets', 'M&Ms Chocolate Candies', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-MMs-300x300.png', FALSE, 80),
('Snickers Bar', 1.90, 'sweets', 'Snickers Chocolate Bar', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Snickers-300x300.png', FALSE, 85),
('Twix Bar', 1.90, 'sweets', 'Twix Chocolate Bar', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Twix-300x300.png', FALSE, 85),
('Kinder Bueno', 2.50, 'sweets', 'Kinder Bueno Chocolate Bar', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Kinder-Bueno-300x300.png', FALSE, 70),
('Milka Chocolate', 3.20, 'sweets', 'Milka Alpine Milk Chocolate', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Milka-300x300.png', FALSE, 65),
('Ferrero Rocher 3pk', 4.50, 'sweets', 'Ferrero Rocher 3 Pieces', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Ferrero-300x300.png', FALSE, 55),

-- More Cigarettes & Tobacco
('Lucky Strike Blue', 9.00, 'cigarettes', 'Lucky Strike Blue Cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Lucky-Strike-300x300.png', TRUE, 55),
('Winston Red', 8.90, 'cigarettes', 'Winston Red Cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Winston-300x300.png', TRUE, 60),
('Davidoff Gold', 9.50, 'cigarettes', 'Davidoff Gold Cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Davidoff-300x300.png', TRUE, 50),
('Marlboro Gold', 9.50, 'cigarettes', 'Marlboro Gold Cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Marlboro-Gold-300x300.png', TRUE, 60),
('Chesterfield Blue', 8.80, 'cigarettes', 'Chesterfield Blue Cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Chesterfield-300x300.png', TRUE, 55),
('American Spirit Blue', 9.80, 'cigarettes', 'American Spirit Blue Cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-American-Spirit-300x300.png', TRUE, 45),

-- Household items
('Kitchen Roll', 3.90, 'household', 'Kitchen Paper Towels 2 Rolls', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Kitchen-Roll-300x300.png', FALSE, 100),
('Toilet Paper 6pk', 5.90, 'household', 'Toilet Paper 6 Rolls', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Toilet-Paper-300x300.png', FALSE, 90),
('Batteries AA 4pk', 6.90, 'household', 'AA Batteries 4-Pack', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Batteries-300x300.png', FALSE, 80),
('Garbage Bags 20pk', 4.50, 'household', 'Garbage Bags 20-Pack', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Garbage-Bags-300x300.png', FALSE, 85);

-- Verify that products were inserted
SELECT COUNT(*) FROM products; 