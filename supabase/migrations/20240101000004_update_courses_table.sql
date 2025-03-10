-- Add new columns to courses table
ALTER TABLE courses
ADD COLUMN IF NOT EXISTS curriculum TEXT,
ADD COLUMN IF NOT EXISTS workload TEXT,
ADD COLUMN IF NOT EXISTS objectives TEXT,
ADD COLUMN IF NOT EXISTS prerequisites TEXT,
ADD COLUMN IF NOT EXISTS checkout_link TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create course_materials table if it doesn't exist
CREATE TABLE IF NOT EXISTS course_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on course_materials
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;

-- Create policies for course_materials
CREATE POLICY "Anyone can view course materials"
  ON course_materials FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert course materials"
  ON course_materials FOR INSERT
  TO authenticated
  WITH CHECK (true);
