
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
  const { toast } = useToast();
  const { user, session } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Upload attempt started");
    console.log("User:", user?.id);
    console.log("Session exists:", !!session);
    
    if (!user || !session) {
      console.log("No user or session found");
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload videos.",
        variant: "destructive",
      });
      return;
    }

    if (!title || !description || !thumbnail || !video) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields and select both a thumbnail and video file.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      console.log("Starting video upload process...");
      
      // First, refresh the session to ensure we have valid tokens
      const { data: refreshedSession, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError || !refreshedSession.session) {
        console.error("Session refresh failed:", refreshError);
        toast({
          title: "Authentication Error",
          description: "Please log out and log back in to continue.",
          variant: "destructive",
        });
        return;
      }

      console.log("Session refreshed successfully");

      // Upload thumbnail
      const thumbnailExt = thumbnail.name.split('.').pop();
      const thumbnailPath = `${user.id}/thumbnail_${Date.now()}.${thumbnailExt}`;
      
      console.log("Uploading thumbnail:", thumbnailPath);
      const { data: thumbnailData, error: thumbnailError } = await supabase.storage
        .from('thumbnails')
        .upload(thumbnailPath, thumbnail);

      if (thumbnailError) {
        console.error("Thumbnail upload error:", thumbnailError);
        throw new Error(`Thumbnail upload failed: ${thumbnailError.message}`);
      }

      console.log("Thumbnail uploaded successfully:", thumbnailData);

      // Upload video
      const videoExt = video.name.split('.').pop();
      const videoPath = `${user.id}/video_${Date.now()}.${videoExt}`;
      
      console.log("Uploading video:", videoPath);
      const { data: videoData, error: videoError } = await supabase.storage
        .from('videos')
        .upload(videoPath, video);

      if (videoError) {
        console.error("Video upload error:", videoError);
        throw new Error(`Video upload failed: ${videoError.message}`);
      }

      console.log("Video uploaded successfully:", videoData);

      // Get public URLs
      const { data: thumbnailUrl } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(thumbnailPath);

      const { data: videoUrl } = supabase.storage
        .from('videos')
        .getPublicUrl(videoPath);

      console.log("Files uploaded successfully, saving metadata...");

      // Save video metadata to database with explicit user_id from current session
      const insertData = {
        user_id: refreshedSession.session.user.id, // Use user ID from refreshed session
        title: title.trim(),
        description: description.trim(),
        thumbnail_url: thumbnailUrl.publicUrl,
        video_url: videoUrl.publicUrl,
      };

      console.log("Inserting video metadata:", insertData);

      const { data: videoRecord, error: dbError } = await supabase
        .from('videos')
        .insert(insertData)
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        
        // Clean up uploaded files if database insertion fails
        await supabase.storage.from('thumbnails').remove([thumbnailPath]);
        await supabase.storage.from('videos').remove([videoPath]);
        
        throw new Error(`Failed to save video: ${dbError.message}. Please try logging out and back in.`);
      }

      console.log("Video uploaded successfully:", videoRecord);

      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded successfully!",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setVideo(null);
      onOpenChange(false);
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "There was an error uploading your video. Please try again.",
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
              disabled={loading || !user || !session}
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
