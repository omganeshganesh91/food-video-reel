
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface VideoLikeButtonProps {
  liked: boolean;
  likesCount: number;
  disabled?: boolean;
  onClick: () => void;
}

const VideoLikeButton: React.FC<VideoLikeButtonProps> = ({
  liked,
  likesCount,
  disabled,
  onClick,
}) => (
  <Button
    onClick={onClick}
    variant={liked ? "default" : "outline"}
    className={`rounded-full flex items-center gap-2 transition-colors ${liked ? "bg-red-500 text-white hover:bg-red-600" : ""}`}
    disabled={disabled}
    aria-label={liked ? "Unlike video" : "Like video"}
    style={{ transition: "background 0.2s" }}
  >
    <Heart
      size={18}
      className={`transition-all duration-150 ${liked ? "text-white fill-white" : ""}`}
      color={liked ? "#fff" : undefined}
      fill={liked ? "#ef4444" : "none"}
    />
    {likesCount} {likesCount === 1 ? "like" : "likes"}
  </Button>
);

export default VideoLikeButton;
