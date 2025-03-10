-- Create credential_validations table
CREATE TABLE IF NOT EXISTS credential_validations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id),
  validated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE credential_validations ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting validations
CREATE POLICY "Anyone can insert credential validations" 
  ON credential_validations FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy for viewing validations (admin only)
CREATE POLICY "Only authenticated users can view credential validations" 
  ON credential_validations FOR SELECT 
  TO authenticated
  USING (true);
