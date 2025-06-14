
-- Table for likes: a user can like a video only once
CREATE TABLE public.video_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (video_id, user_id)
);

-- Allow select likes for everyone, insert/delete only for authenticated
ALTER TABLE public.video_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes"
  ON public.video_likes
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert likes" 
  ON public.video_likes
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated can delete their like"
  ON public.video_likes
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Table for comments
CREATE TABLE public.video_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
  ON public.video_comments
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert comment"
  ON public.video_comments
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- (Optionally) add a policy for updates/deletes by owner if you wish

