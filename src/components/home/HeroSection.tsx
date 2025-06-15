
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div
      className="relative h-96 bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/ba582a4b-544a-4d0a-b06d-01cdd86c70d2.png')`,
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Hosur Recipes</h1>
        <p className="text-xl mb-8">No Fluff, Just Recipes</p>
        {!user && (
          <div className="space-x-4">
            <Button
              onClick={() => navigate('/login')}
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-3 font-medium"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 rounded-full px-8 py-3 font-medium"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default HeroSection;
