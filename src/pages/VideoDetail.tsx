
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const VideoDetail = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [comment, setComment] = useState("");
  const [comments] = useState([
    { id: 1, user: "Chef Anna", text: "Amazing recipe! The technique is perfect." },
    { id: 2, user: "FoodLover123", text: "Just made this, turned out great!" }
  ]);
  const navigate = useNavigate();

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New comment:", comment);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation isLoggedIn={true} onLogout={() => navigate('/')} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Video Player */}
        <div className="aspect-video bg-gray-900 rounded-xl mb-6 flex items-center justify-center">
          <p className="text-white text-lg">Video Player - Recipe {id}</p>
        </div>
        
        {/* Video Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Delicious Homemade Recipe
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">by Chef Sarah • 2 days ago</p>
            <Button
              onClick={handleLike}
              variant={liked ? "default" : "outline"}
              className="rounded-full"
            >
              {liked ? "❤️" : "🤍"} {likes} likes
            </Button>
          </div>
        </div>
        
        {/* Description */}
        <Card className="mb-8 rounded-xl">
          <CardContent className="p-6">
            <p className="text-gray-700">
              This recipe has been passed down through generations in my family. 
              The secret is in the timing and using fresh, quality ingredients.
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
              placeholder="Add a comment..."
              className="flex-1 rounded-full"
            />
            <Button 
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
            >
              Post
            </Button>
          </form>
          
          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-sm">
                        {comment.user[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{comment.user}</p>
                      <p className="text-gray-700 mt-1">{comment.text}</p>
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
