
import React from "react";

interface VideoPlayerProps {
  videoUrl?: string;
  fallbackText?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, fallbackText }) => (
  <div className="aspect-video bg-gray-900 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
    {videoUrl ? (
      <video
        src={videoUrl}
        autoPlay
        controls
        className="w-full h-full object-cover rounded-xl"
        style={{ maxHeight: 400 }}
      />
    ) : (
      <p className="text-white text-lg">{fallbackText}</p>
    )}
  </div>
);

export default VideoPlayer;
