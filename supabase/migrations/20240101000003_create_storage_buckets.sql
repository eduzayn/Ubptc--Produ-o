-- Create storage buckets for ebooks and course materials

-- Create ebooks bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('ebooks', 'ebooks', true)
ON CONFLICT (id) DO NOTHING;

-- Create course_materials bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('course_materials', 'course_materials', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for ebooks bucket
CREATE POLICY "Anyone can read ebooks"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ebooks');

CREATE POLICY "Authenticated users can upload ebooks"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'ebooks');

-- Create policies for course_materials bucket
CREATE POLICY "Anyone can read course materials"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'course_materials');

CREATE POLICY "Authenticated users can upload course materials"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'course_materials');
