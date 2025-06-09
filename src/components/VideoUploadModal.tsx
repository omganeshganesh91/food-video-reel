
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface VideoUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoUploadModal = ({ open, onOpenChange }: VideoUploadModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This is a placeholder - would connect to backend in a real app
      console.log("Uploading:", { title, description, thumbnail, video });
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded successfully!",
      });
      
      onOpenChange(false);
      // In a real app, we might refresh the video list or navigate
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Recipe Video</DialogTitle>
          <DialogDescription>Share your culinary creation with the community</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
              rows={3}
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
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Video"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VideoUploadModal;
