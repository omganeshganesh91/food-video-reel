
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  user_id: string;
  comment: string;
  created_at: string;
  user?: string;
}

interface VideoCommentsProps {
  comments: Comment[];
  user: any;
  comment: string;
  postingComment: boolean;
  onCommentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const VideoComments: React.FC<VideoCommentsProps> = ({
  comments,
  user,
  comment,
  postingComment,
  onCommentChange,
  onSubmit,
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
    <form onSubmit={onSubmit} className="flex gap-4">
      <Input
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
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
);

export default VideoComments;
