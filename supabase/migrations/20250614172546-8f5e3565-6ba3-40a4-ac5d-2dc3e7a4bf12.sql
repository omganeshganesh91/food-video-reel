
-- Enable Row Level Security on the videos table
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can create videos" ON public.videos;
DROP POLICY IF EXISTS "Users can update their own videos" ON public.videos;
DROP POLICY IF EXISTS "Users can delete their own videos" ON public.videos;

-- Create policy for viewing videos (allow everyone to view)
CREATE POLICY "Users can view all videos" 
  ON public.videos 
  FOR SELECT 
  TO authenticated, anon;

-- Create policy for inserting videos (only authenticated users can create their own videos)
CREATE POLICY "Authenticated users can create videos" 
  ON public.videos 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating videos (users can only update their own videos)
CREATE POLICY "Users can update their own videos" 
  ON public.videos 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy for deleting videos (users can only delete their own videos)
CREATE POLICY "Users can delete their own videos" 
  ON public.videos 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);
