
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const VideoFeed = () => {
  const { user, signOut, loading } = useAuth();
  const [videos] = useState([]); // Empty for now - will show placeholder
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show feed page for both logged in and non-logged in users
  // Non-logged in users will see sign in options in the navigation
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
                onClick={() => navigate('/upload')}
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
            {videos.map((video: any) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow rounded-xl">
                <div className="aspect-video bg-gray-200">
                  {/* Video thumbnail will go here */}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {video.creator}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{video.likes} likes</span>
                    <span>{video.comments} comments</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;
