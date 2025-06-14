import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Heart } from "lucide-react";

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
  const [likeId, setLikeId] = useState<string | null>(null); // To delete like
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [postingComment, setPostingComment] = useState(false);
  const [video, setVideo] = useState<{ title: string; description: string; user_id: string; created_at: string } | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch video info (optional, but makes UI look real)
  useEffect(() => {
    if (!id) return;
    setVideoLoading(true);
    supabase
      .from("videos")
      .select("title,description,user_id,created_at")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setVideo(data || null);
        setVideoLoading(false);
      });
  }, [id]);

  // Fetch likes
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

  // Fetch comments
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
            // For now, don't resolve username
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

  // Like / Unlike functionality
  const handleLike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!id) return;
    if (liked && likeId) {
      // Unlike: delete like row
      await supabase.from("video_likes").delete().eq("id", likeId);
      setLiked(false);
      setLikesCount((count) => Math.max(0, count - 1));
      setLikeId(null);
    } else {
      // Like: insert row
      const { data, error } = await supabase.from("video_likes").insert({
        video_id: id,
        user_id: user.id,
      }).select().single();
      if (!error && data) {
        setLiked(true);
        setLikesCount((count) => count + 1);
        setLikeId(data.id);
      }
    }
    // Refresh from db to keep totals correct if needed
    fetchLikes();
  };

  // Comment Submission
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
      <Navigation isLoggedIn={!!user} onLogout={() => navigate('/')} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Video Player */}
        <div className="aspect-video bg-gray-900 rounded-xl mb-6 flex items-center justify-center">
          <p className="text-white text-lg">Video Player - Recipe {id}</p>
        </div>

        {/* Video Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {video ? video.title : "Recipe video"}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              by {video?.user_id?.slice(0, 6) || "unknown"} • {video?.created_at?.slice(0, 10)}
            </p>
            <Button
              onClick={handleLike}
              variant={liked ? "default" : "outline"}
              className={`rounded-full flex items-center gap-2`}
              disabled={!user}
            >
              <Heart size={18} className={liked ? "text-red-500 fill-red-500" : ""} />
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </Button>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-8 rounded-xl">
          <CardContent className="p-6">
            <p className="text-gray-700">
              {video?.description ||
                "This recipe has been passed down through generations in my family. The secret is in the timing and using fresh, quality ingredients."}
            </p>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Comments</h2>

          {/* Add Comment */}
          <form onSubmit={handleComment} className="flex gap-4">
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={user ? "Add a comment..." : "Please sign in to comment"}
              className="flex-1 rounded-full"
              disabled={!user || postingComment}
            />
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
              disabled={!user || postingComment}
            >
              {postingComment ? "Posting..." : "Post"}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 && (
              <Card className="rounded-xl">
                <CardContent className="p-4">
                  <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                </CardContent>
              </Card>
            )}
            {comments.map((c) => (
              <Card key={c.id} className="rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-sm">
                        {c.user?.[0] || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{c.user || c.user_id.slice(0, 8)}</p>
                      <p className="text-gray-700 mt-1 whitespace-pre-line">{c.comment}</p>
                      <div className="text-xs text-gray-400 mt-1">{c.created_at.slice(0, 16).replace("T", " ")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
