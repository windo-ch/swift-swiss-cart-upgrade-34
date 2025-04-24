-- Create age verifications table for tracking user age verification status
CREATE TABLE IF NOT EXISTS age_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verification_method VARCHAR(50) NOT NULL,
  is_valid BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS age_verifications_user_id_idx ON age_verifications(user_id);
CREATE INDEX IF NOT EXISTS age_verifications_valid_idx ON age_verifications(is_valid);
CREATE INDEX IF NOT EXISTS age_verifications_expires_idx ON age_verifications(expires_at);

-- Configure RLS policies
ALTER TABLE age_verifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own age verifications
CREATE POLICY "Users can view their own age verifications" ON age_verifications
  FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can create their own age verifications
CREATE POLICY "Users can create their own age verifications" ON age_verifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only admin users can modify age verifications
CREATE POLICY "Admin users can update age verifications" ON age_verifications
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    auth.uid() IN (SELECT id FROM auth.users WHERE auth.users.is_admin = true)
  );

-- Only admin users can delete age verifications
CREATE POLICY "Admin users can delete age verifications" ON age_verifications
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    auth.uid() IN (SELECT id FROM auth.users WHERE auth.users.is_admin = true)
  );

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_age_verification_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger for the updated_at column
CREATE TRIGGER update_age_verification_timestamp
BEFORE UPDATE ON age_verifications
FOR EACH ROW
EXECUTE FUNCTION update_age_verification_updated_at(); 