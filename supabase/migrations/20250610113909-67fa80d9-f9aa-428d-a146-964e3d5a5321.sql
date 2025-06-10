
-- Create a table to store video metadata
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies for videos table
CREATE POLICY "Users can view all videos" 
  ON public.videos 
  FOR SELECT 
  TO authenticated, anon;

CREATE POLICY "Authenticated users can create videos" 
  ON public.videos 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own videos" 
  ON public.videos 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own videos" 
  ON public.videos 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Create storage buckets for videos and thumbnails
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('videos', 'videos', true),
  ('thumbnails', 'thumbnails', true);

-- Create storage policies for videos bucket
CREATE POLICY "Authenticated users can upload videos" ON storage.objects
  FOR INSERT 
  TO authenticated
  WITH CHECK (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view videos" ON storage.objects
  FOR SELECT 
  TO authenticated, anon
  USING (bucket_id = 'videos');

CREATE POLICY "Users can update their own videos in storage" ON storage.objects
  FOR UPDATE 
  TO authenticated
  USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own videos in storage" ON storage.objects
  FOR DELETE 
  TO authenticated
  USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for thumbnails bucket
CREATE POLICY "Authenticated users can upload thumbnails" ON storage.objects
  FOR INSERT 
  TO authenticated
  WITH CHECK (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view thumbnails" ON storage.objects
  FOR SELECT 
  TO authenticated, anon
  USING (bucket_id = 'thumbnails');

CREATE POLICY "Users can update their own thumbnails in storage" ON storage.objects
  FOR UPDATE 
  TO authenticated
  USING (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own thumbnails in storage" ON storage.objects
  FOR DELETE 
  TO authenticated
  USING (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);
