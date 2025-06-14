
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import FloatingHeart from "@/components/FloatingHeart";
import VideoPlayer from "@/components/videoDetail/VideoPlayer";
import VideoInfo from "@/components/videoDetail/VideoInfo";
import VideoLikeButton from "@/components/videoDetail/VideoLikeButton";
import VideoComments from "@/components/videoDetail/VideoComments";

interface Comment {
  id: string;
  user_id: string;
  comment: string;
  created_at: string;
  user?: string;
}

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likeId, setLikeId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [postingComment, setPostingComment] = useState(false);
  const [video, setVideo] = useState<{ title: string; description: string; user_id: string; created_at: string; video_url?: string } | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setVideoLoading(true);
    supabase
      .from("videos")
      .select("title,description,user_id,created_at,video_url")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setVideo(data || null);
        setVideoLoading(false);
      });
  }, [id]);

  const fetchLikes = useCallback(() => {
    if (!id) return;
    supabase
      .from("video_likes")
      .select("id, user_id")
      .eq("video_id", id)
      .then(({ data }) => {
        setLikesCount(data?.length || 0);
        if (user && data) {
          const match = data.find((like) => like.user_id === user.id);
          setLiked(!!match);
          setLikeId(match?.id || null);
        } else {
          setLiked(false);
          setLikeId(null);
        }
      });
  }, [id, user]);

  const fetchComments = useCallback(() => {
    if (!id) return;
    supabase
      .from("video_comments")
      .select("id, user_id, comment, created_at")
      .eq("video_id", id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setComments(
          (data || []).map((c) => ({
            ...c,
            user: c.user_id.slice(0, 8)
          }))
        );
      });
  }, [id]);

  useEffect(() => {
    fetchLikes();
    fetchComments();
    setLoading(false);
  }, [fetchLikes, fetchComments]);

  const handleLike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!id) return;
    if (liked && likeId) {
      await supabase.from("video_likes").delete().eq("id", likeId);
      setLiked(false);
      setLikesCount((count) => Math.max(0, count - 1));
      setLikeId(null);
    } else {
      const { data, error } = await supabase.from("video_likes").insert({
        video_id: id,
        user_id: user.id,
      }).select().single();
      if (!error && data) {
        setLiked(true);
        setLikesCount((count) => count + 1);
        setLikeId(data.id);
        setShowHeartAnim(true);
      }
    }
    fetchLikes();
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!comment.trim() || !id) return;
    setPostingComment(true);
    await supabase.from("video_comments").insert({
      video_id: id,
      user_id: user.id,
      comment,
    });
    setComment("");
    setPostingComment(false);
    fetchComments();
  };

  if (loading || videoLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <FloatingHeart show={showHeartAnim} onAnimationEnd={() => setShowHeartAnim(false)} />
      <Navigation isLoggedIn={!!user} onLogout={() => navigate('/')} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <VideoPlayer
          videoUrl={video?.video_url}
          fallbackText={`Video Player - Recipe ${id}`}
        />
        <VideoInfo
          title={video ? video.title : "Recipe video"}
          userId={video?.user_id || "unknown"}
          createdAt={video?.created_at || ""}
        >
          <VideoLikeButton
            liked={liked}
            likesCount={likesCount}
            disabled={!user}
            onClick={handleLike}
          />
        </VideoInfo>
        <Card className="mb-8 rounded-xl">
          <CardContent className="p-6">
            <p className="text-gray-700">
              {video?.description ||
                "This recipe has been passed down through generations in my family. The secret is in the timing and using fresh, quality ingredients."}
            </p>
          </CardContent>
        </Card>
        <VideoComments
          comments={comments}
          user={user}
          comment={comment}
          postingComment={postingComment}
          onCommentChange={setComment}
          onSubmit={handleComment}
        />
      </div>
    </div>
  );
};

export default VideoDetail;
