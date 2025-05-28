
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ isLoggedIn = false, onLogout }: NavigationProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/feed');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center space-x-8">
        <h1 
          onClick={handleLogoClick}
          className="text-2xl font-bold text-gray-900 cursor-pointer"
        >
          Hosur<span className="text-gray-600">Recipes</span>
        </h1>
        
        <div className="hidden md:flex items-center space-x-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/about')}
            className="text-gray-600 hover:text-gray-900"
          >
            About
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/feed')}
            className="text-gray-600 hover:text-gray-900"
          >
            Videos
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/search')}
            className="text-gray-600 hover:text-gray-900"
          >
            Recipes
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Button 
              onClick={() => navigate('/upload')}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6"
            >
              Upload Video
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-gray-200 text-gray-700">
                    U
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button 
            onClick={() => navigate('/login')}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6"
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
