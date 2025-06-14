
import React from "react";

interface VideoInfoProps {
  title: string;
  userId: string;
  createdAt: string;
}

const VideoInfo: React.FC<React.PropsWithChildren<VideoInfoProps>> = ({
  title,
  userId,
  createdAt,
  children,
}) => (
  <div className="mb-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
    <div className="flex items-center justify-between">
      <p className="text-gray-600">
        by {userId.slice(0, 6) || "unknown"} • {createdAt.slice(0, 10)}
      </p>
      {children}
    </div>
  </div>
);

export default VideoInfo;

