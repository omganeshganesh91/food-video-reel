import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import VideoUploadModal from "@/components/VideoUploadModal";
import { supabase } from "@/integrations/supabase/client";
import { Heart, MessageCircle, Play } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  created_at: string;
  user_id: string;
  author?: string;
  likes?: number;
  comments?: number;
}

const VideoFeed = () => {
  const { user, signOut, loading } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleUploadClick = () => {
    if (user) {
      setShowUploadModal(true);
    } else {
      navigate('/login');
    }
  };

  // Fetch like and comment counts for multiple videos and merge data
  const fetchCounts = async (videoIds: string[]) => {
    let likesCounts: Record<string, number> = {};
    let commentsCounts: Record<string, number> = {};
    if (videoIds.length === 0) return { likesCounts, commentsCounts };

    // Aggregate the counts using Supabase
    // Fetch all likes for these videos
    const { data: likes, error: likesError } = await supabase
      .from('video_likes')
      .select('video_id')
    if (likesError) {
      console.error("Failed to get likes:", likesError);
    }
    if (likes) {
      likes.forEach((like: { video_id: string }) => {
        if (like.video_id)
          likesCounts[like.video_id] = (likesCounts[like.video_id] || 0) + 1;
      });
    } else {
      console.warn("Likes are null/undefined", likes);
    }

    // Fetch all comments for these videos
    const { data: comments, error: commentsError } = await supabase
      .from('video_comments')
      .select('video_id')
    if (commentsError) {
      console.error("Failed to get comments:", commentsError);
    }
    if (comments) {
      comments.forEach((comment: { video_id: string }) => {
        if (comment.video_id)
          commentsCounts[comment.video_id] = (commentsCounts[comment.video_id] || 0) + 1;
      });
    } else {
      console.warn("Comments are null/undefined", comments);
    }

    // Debug output for both counts:
    console.log("LikesCounts:", likesCounts);
    console.log("CommentsCounts:", commentsCounts);

    return { likesCounts, commentsCounts };
  };

  const fetchVideos = async () => {
    setVideosLoading(true);
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching videos:", error);
        setVideosLoading(false);
        return;
      }
      const videoList: Video[] = (data || []).map((v) => ({
        ...v,
        author: "Anonymous",
      }));

      // Fetch counts
      const ids = videoList.map((v) => v.id).filter(Boolean);
      const { likesCounts, commentsCounts } = await fetchCounts(ids);

      const patched = videoList.map((v) => ({
        ...v,
        likes: typeof likesCounts[v.id] === 'number' ? likesCounts[v.id] : 0,
        comments: typeof commentsCounts[v.id] === 'number' ? commentsCounts[v.id] : 0,
      }));
      console.log("Patched video list: ", patched);
      setVideos(patched);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setVideosLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadModalChange = (open: boolean) => {
    setShowUploadModal(open);
    if (!open) {
      fetchVideos();
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`/video/${id}`);
  };

  if (loading || videosLoading) {
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
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-100">
      <Navigation isLoggedIn={!!user} onLogout={handleLogout} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Video Feed</h1>
        {videos.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-64 h-64 mx-auto mb-8 rounded-xl flex items-center justify-center overflow-hidden p-4">
              <img 
                src="/lovable-uploads/cea33b3d-a265-4002-8a1c-6b8a0f3f2dc6.png" 
                alt="Delicious food spread"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Upload a video. Become the first.
            </h2>
            <p className="text-gray-500 mb-6">
              Upload the first video to get this party started.
            </p>
            {user ? (
              <Button 
                onClick={handleUploadClick}
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-3"
              >
                Upload
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/login')}
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-3"
              >
                Sign In to Upload
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Card
                key={video.id}
                className="rounded-xl p-0 bg-white shadow hover:shadow-xl transition-shadow border border-gray-200 cursor-pointer"
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
              >
                <div 
                  className="relative aspect-video w-full overflow-hidden rounded-t-xl"
                  style={{ minHeight: 0, cursor: 'pointer' }}
                  onClick={() => handleCardClick(video.id)}
                >
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Gradient overlay at the bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  {/* "Watch Now" overlay on hover */}
                  {hoveredId === video.id && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
                    >
                      <div className="bg-white/90 rounded-full px-6 py-2 flex items-center gap-2 text-gray-900 text-base font-semibold shadow-md">
                        <Play size={20} className="mr-2" />
                        Watch Now
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <span className="text-lg font-semibold text-gray-900">{video.title}</span>
                  <span className="text-sm text-gray-500 mb-2">By {video.author || "Anonymous"}</span>
                  <div className="flex items-center gap-6 text-gray-400 mt-2">
                    <div className="flex items-center space-x-1">
                      <Heart size={18} /> <span className="ml-1 text-sm">{video.likes ?? 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={18} /> <span className="ml-1 text-sm">{video.comments ?? 0}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <VideoUploadModal 
        open={showUploadModal} 
        onOpenChange={handleUploadModalChange} 
      />
    </div>
  );
};

export default VideoFeed;
