
-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for the product-images bucket
CREATE POLICY IF NOT EXISTS "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY IF NOT EXISTS "Authenticated Insert Access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY IF NOT EXISTS "Authenticated Update Access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

CREATE POLICY IF NOT EXISTS "Authenticated Delete Access"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
