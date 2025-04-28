-- SQL script to replace the existing products with the correct ones
-- Run this in the Supabase SQL Editor

-- First, check if we have products
SELECT COUNT(*) FROM products;

-- Delete all existing products
DELETE FROM products;

-- Insert the new products (64 total)
INSERT INTO products (name, price, category, description, image, agerestricted, stock) VALUES
-- Water (Wasser) - 5 products
('Valser Prickelnd', 2.50, 'wasser', 'Valser sparkling water', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-valser-prickelnd-300x300.png', FALSE, 50),
('Valser Still', 2.50, 'wasser', 'Valser still water', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-valser-still-300x300.png', FALSE, 50),
('Lauretana mit Kohlensäure', 3.50, 'wasser', 'Lauretana sparkling water', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-lauretana-sparkling-300x300.png', FALSE, 50),
('Lauretana ohne Kohlensäure', 3.50, 'wasser', 'Lauretana still water', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-lauretana-still-300x300.png', FALSE, 50),
('San Pellegrino Sparkling Water', 1.90, 'wasser', 'San Pellegrino Sparkling Mineral Water 1L', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-San-Pellegrino-300x300.png', FALSE, 60),

-- Energy Drinks - 2 products
('Red Bull Original', 3.50, 'energy-drinks', 'Red Bull Original energy drink', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-redbull-original-300x300.png', FALSE, 50),
('Red Bull Sugarfree', 3.50, 'energy-drinks', 'Red Bull Sugarfree energy drink', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-redbull-sugarfree-300x300.png', FALSE, 50),

-- Soft Drinks - 11 products
('AriZona Honey Ice Tea', 3.50, 'soft-drinks', 'AriZona Honey Ice Tea', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-arizona-honey-300x300.png', FALSE, 50),
('AriZona Honey Ice Tea 1.5L', 6.50, 'soft-drinks', 'AriZona Honey Ice Tea in a 1.5L bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-arizona-honey-15l-300x300.png', FALSE, 50),
('AriZona Pfirsich Ice Tea 1.5L', 6.50, 'soft-drinks', 'AriZona Peach Ice Tea in a 1.5L bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-arizona-peach-15l-300x300.png', FALSE, 50),
('Capri-Sun Multivitamin', 2.00, 'soft-drinks', 'Capri-Sun Multivitamin juice drink', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-capri-sun-300x300.png', FALSE, 50),
('Coca Cola 1.5l', 5.90, 'soft-drinks', 'Coca Cola in a 1.5L bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-coca-cola-15l-300x300.png', FALSE, 50),
('Coca Cola Zero', 2.50, 'soft-drinks', 'Coca Cola Zero', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-coca-cola-zero-300x300.png', FALSE, 50),
('Coca-Cola Classic', 2.50, 'soft-drinks', 'Coca-Cola Classic', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-coca-cola-classic-300x300.png', FALSE, 50),
('Fanta 1.5l', 5.90, 'soft-drinks', 'Fanta in a 1.5L bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-fanta-15l-300x300.png', FALSE, 50),
('San Bedetto Ice Tea Lemon', 2.50, 'soft-drinks', 'San Benedetto Lemon Ice Tea', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-san-benedetto-lemon-300x300.png', FALSE, 50),
('San Benedetto Ice Tea Pfirsich', 2.50, 'soft-drinks', 'San Benedetto Peach Ice Tea', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-san-benedetto-peach-300x300.png', FALSE, 50),
('Sprite 1.5L', 2.90, 'soft-drinks', 'Sprite Lemon-Lime Soda 1.5L', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Sprite-300x300.png', FALSE, 75),

-- Snacks - 14 products
('Zweifel Nature Chips', 4.90, 'chips-snacks', 'Zweifel Nature flavored chips', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-zweifel-nature-300x300.png', FALSE, 50),
('Zweifel Paprika Chips', 4.90, 'chips-snacks', 'Zweifel Paprika flavored chips', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-zweifel-paprika-300x300.png', FALSE, 50),
('Fonzies Original Käse Chips', 4.90, 'chips-snacks', 'Fonzies Original Cheese flavored chips', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-fonzies-cheese-300x300.png', FALSE, 50),
('Granforno Grissini Traditionell', 5.90, 'chips-snacks', 'Granforno Traditional Grissini breadsticks', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-granforno-grissini-300x300.png', FALSE, 50),
('Kinder Schokolade Stk.Preis', 0.70, 'sweets', 'Kinder Chocolate, price per piece', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-kinder-chocolate-300x300.png', FALSE, 100),
('Kinder-Bueno (Einzeler Riegel)', 1.60, 'sweets', 'Kinder Bueno chocolate bar', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-kinder-bueno-300x300.png', FALSE, 100),
('Kinder-Milchschnitte', 1.20, 'sweets', 'Kinder Milk Slice', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-kinder-milchschnitte-300x300.png', FALSE, 100),
('Nippon Hosta', 4.90, 'chips-snacks', 'Nippon Hosta snack', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-nippon-hosta-300x300.png', FALSE, 50),
('Oreo Original', 4.90, 'sweets', 'Oreo Original cookies', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-oreo-original-300x300.png', FALSE, 50),
('Smoki Erdnuss Flips', 3.90, 'chips-snacks', 'Smoki Peanut Flips', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-smoki-peanut-300x300.png', FALSE, 50),
('TUC Original LU gesalzen', 2.90, 'chips-snacks', 'TUC Original LU salted crackers', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-tuc-original-300x300.png', FALSE, 50),
('Pringles Original', 4.50, 'chips-snacks', 'Pringles Original Potato Crisps', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Pringles-300x300.png', FALSE, 45),
('Haribo Goldbären', 3.90, 'sweets', 'Haribo Goldbären Gummy Bears', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Haribo-300x300.png', FALSE, 50),
('Toblerone Chocolate', 4.95, 'sweets', 'Toblerone Swiss Milk Chocolate with Honey and Almond Nougat', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Toblerone-300x300.png', FALSE, 40),

-- Non-Food - 7 products
('Babywindel Gr.4 (8 Stk.)', 5.50, 'non-food', 'Baby diapers, size 4, pack of 8', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-baby-diapers-300x300.png', FALSE, 30),
('Kosmetiktücher-Box', 4.90, 'non-food', 'Box of facial tissues', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-tissues-box-300x300.png', FALSE, 30),
('o.b. Procompfort mini', 3.90, 'non-food', 'o.b. ProComfort mini tampons', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-ob-tampons-300x300.png', FALSE, 30),
('Plastik Shotsbecher', 0.30, 'non-food', 'Plastic shot glasses', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-shot-glasses-300x300.png', FALSE, 100),
('Plastikbecher', 0.30, 'non-food', 'Plastic cups', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-plastic-cups-300x300.png', FALSE, 100),
('Taschentuch-Packung (2 Stk.)', 2.20, 'non-food', 'Pack of tissues, 2 pieces', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-tissue-pack-300x300.png', FALSE, 50),
('WC Papier (1 Rolle)', 2.40, 'non-food', 'Toilet paper, 1 roll', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-toilet-paper-300x300.png', FALSE, 50),

-- Tobacco - 8 products
('American Spirit Blue Tabak', 11.90, 'tobacco', 'American Spirit Blue tobacco', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-american-spirit-300x300.png', TRUE, 20),
('Vogue Slim Blue', 12.90, 'tobacco', 'Vogue Slim Blue cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-vogue-slim-300x300.png', TRUE, 20),
('Sullana Drehtabak', 11.90, 'tobacco', 'Sullana rolling tobacco', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-sullana-tobacco-300x300.png', TRUE, 20),
('Parisienne Jaune', 12.90, 'tobacco', 'Parisienne Jaune cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-parisienne-300x300.png', TRUE, 20),
('Philip Morris Quantum Blue', 13.90, 'tobacco', 'Philip Morris Quantum Blue cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-philip-morris-300x300.png', TRUE, 20),
('Marlboro Gold', 12.90, 'tobacco', 'Marlboro Gold cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-marlboro-gold-300x300.png', TRUE, 20),
('Marlboro Rot', 12.90, 'tobacco', 'Marlboro Red cigarettes', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-marlboro-red-300x300.png', TRUE, 20),
('Smoking Blue King Size', 2.50, 'tobacco', 'Smoking Blue King Size rolling papers', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-smoking-papers-300x300.png', TRUE, 50),

-- Beer - 10 products
('Feldschlösschen Original 0.33l', 2.50, 'beer', 'Original Feldschlösschen beer in a 0.33l bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-feldschlosschen-033-300x300.png', TRUE, 50),
('Feldschlösschen Original', 3.50, 'beer', 'Original Feldschlösschen beer', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-feldschlosschen-300x300.png', TRUE, 50),
('Quöllfrisch 0.33l', 2.50, 'beer', 'Quöllfrisch beer in a 0.33l bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-quollfrisch-033-300x300.png', TRUE, 50),
('Quöllfrisch', 3.50, 'beer', 'Quöllfrisch beer', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-quollfrisch-300x300.png', TRUE, 50),
('Birra Ichnusa non Filtre', 3.90, 'beer', 'Unfiltered Birra Ichnusa beer', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-ichnusa-300x300.png', TRUE, 50),
('Birra Morreti', 2.80, 'beer', 'Birra Morreti beer', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-moretti-300x300.png', TRUE, 50),
('Desperados Original', 3.60, 'beer', 'Original Desperados beer', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-desperados-300x300.png', TRUE, 50),
('Früh Kölsch 0.33l', 3.50, 'beer', 'Früh Kölsch beer in a 0.33l bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-fruh-kolsch-300x300.png', TRUE, 50),
('Heineken Premium 0.33l', 2.50, 'beer', 'Heineken Premium beer in a 0.33l bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-heineken-033-300x300.png', TRUE, 50),
('Corona Extra Beer 6-pack', 12.90, 'beer', 'Corona Extra Beer 6x330ml', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Corona-6pack-300x300.png', TRUE, 40),

-- Wine & Spirits - 7 products
('Bluesecco Blu Rosé Rubicone IGT', 4.20, 'wii-spirituose', 'Bluesecco Blu Rosé sparkling wine from the Rubicone region, Italy', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-bluesecco-rose-300x300.png', TRUE, 20),
('Bluesecco Blu Trevenezie IGT', 4.20, 'wii-spirituose', 'Bluesecco Blu sparkling wine from the Trevenezie region, Italy', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-bluesecco-blue-300x300.png', TRUE, 20),
('Ballantine''s Finest Scotch', 34.00, 'wii-spirituose', 'Ballantine''s Finest Scotch Whisky', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-ballantines-300x300.png', TRUE, 10),
('Jack Daniel''s Tennessee Whiskey', 49.00, 'wii-spirituose', 'Jack Daniel''s Tennessee Whiskey', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-jack-daniels-300x300.png', TRUE, 10),
('Jägermeister 70cl', 39.00, 'wii-spirituose', 'Jägermeister herbal liqueur, 70cl bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-jagermeister-300x300.png', TRUE, 10),
('Vodka Absolut 70cl', 46.00, 'wii-spirituose', 'Absolut Vodka, 70cl bottle', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-absolut-vodka-300x300.png', TRUE, 10),
('Bombay Sapphire Gin', 29.90, 'wii-spirituose', 'Bombay Sapphire London Dry Gin', 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-Bombay-Sapphire-300x300.png', TRUE, 25);

-- Check the results (should show 64 products)
SELECT COUNT(*) FROM products; 