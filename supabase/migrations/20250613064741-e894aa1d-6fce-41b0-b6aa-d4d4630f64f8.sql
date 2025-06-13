
-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Authenticated users can create videos" ON public.videos;
DROP POLICY IF EXISTS "Users can update their own videos" ON public.videos;
DROP POLICY IF EXISTS "Users can delete their own videos" ON public.videos;

-- Recreate the INSERT policy with proper authentication check
CREATE POLICY "Authenticated users can create videos" 
  ON public.videos 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Recreate UPDATE policy
CREATE POLICY "Users can update their own videos" 
  ON public.videos 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Recreate DELETE policy
CREATE POLICY "Users can delete their own videos" 
  ON public.videos 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);
