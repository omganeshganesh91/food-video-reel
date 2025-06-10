
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import VideoUploadModal from "@/components/VideoUploadModal";
import { supabase } from "@/integrations/supabase/client";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  created_at: string;
  user_id: string;
}

const VideoFeed = () => {
  const { user, signOut, loading } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
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

  const fetchVideos = async () => {
    try {
      console.log("Fetching videos from database...");
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching videos:", error);
        return;
      }

      console.log("Fetched videos:", data);
      setVideos(data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setVideosLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Refresh videos when upload modal closes
  const handleUploadModalChange = (open: boolean) => {
    setShowUploadModal(open);
    if (!open) {
      fetchVideos();
    }
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
    <div className="min-h-screen bg-white">
      <Navigation isLoggedIn={!!user} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Video Feed</h1>
        
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow rounded-xl">
                <div className="aspect-video bg-gray-200">
                  <img 
                    src={video.thumbnail_url} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(video.created_at).toLocaleDateString()}</span>
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
