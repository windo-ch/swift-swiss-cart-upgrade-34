-- Add district column to orders table
ALTER TABLE orders ADD COLUMN district TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN orders.district IS 'The delivery district selected by the customer'; 