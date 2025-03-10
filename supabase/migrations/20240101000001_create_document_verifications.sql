-- Create document_verifications table
CREATE TABLE IF NOT EXISTS document_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id),
  document_type TEXT NOT NULL,
  is_valid BOOLEAN NOT NULL,
  confidence FLOAT,
  feedback TEXT,
  detected_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE document_verifications ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting verifications
CREATE POLICY "Service role can insert document verifications" 
  ON document_verifications FOR INSERT 
  TO service_role
  WITH CHECK (true);

-- Create policy for viewing verifications (admin only)
CREATE POLICY "Only authenticated users can view document verifications" 
  ON document_verifications FOR SELECT 
  TO authenticated
  USING (true);
