
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Upload attempt:", { title, description, thumbnail, video });
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation isLoggedIn={true} onLogout={() => navigate('/')} />
      
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Upload New Recipe Video</CardTitle>
            <CardDescription>Share your culinary creation with the community</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="rounded-lg"
                  placeholder="e.g., Homemade Pasta Carbonara"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="rounded-lg"
                  placeholder="Describe your recipe, ingredients, and cooking tips..."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                  required
                  className="rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="video">Recipe Video</Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files?.[0] || null)}
                  required
                  className="rounded-lg"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3"
              >
                Upload Recipe Video
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadVideo;
