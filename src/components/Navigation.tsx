import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import VideoUploadModal from "@/components/VideoUploadModal";

interface NavigationProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ isLoggedIn = false, onLogout }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, signOut, user } = useAuth();
  const { toast } = useToast();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Sign up form state
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleUploadClick = () => {
    if (isLoggedIn) {
      setShowUploadModal(true);
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    
    const email = user.email || "";
    const username = user.user_metadata?.username || "";
    
    if (username) {
      return username.substring(0, 2).toUpperCase();
    }
    
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    
    return "U";
  };

  // Get display name for user
  const getDisplayName = () => {
    if (!user) return "User";
    
    const username = user.user_metadata?.username;
    if (username) return username;
    
    const email = user.email;
    if (email) return email.split('@')[0];
    
    return "User";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(loginEmail, loginPassword);
    
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      setShowLoginDialog(false);
      setLoginEmail("");
      setLoginPassword("");
      // Stay on current page - don't redirect
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(signUpEmail, signUpPassword, signUpUsername);
    
    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sign Up Successful",
        description: "Welcome to Hosur Recipes! Please check your email to verify your account.",
      });
      setShowSignUpDialog(false);
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpUsername("");
      // Stay on current page - don't redirect
    }
    
    setLoading(false);
  };

  // Add a state for search input
  const [searchInput, setSearchInput] = useState("");

  // Sync the search bar value when SearchResults navigation occurs
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || "";
    setSearchInput(q);
  }, [location.pathname, location.search]);

  // Handle Enter on the search bar anywhere in the nav
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <>
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
          {/* Search input with rounded style, no border, shorter width and more horizontal padding */}
          <Input
            placeholder="Search recipes..."
            className="w-48 rounded-full border-0 bg-gray-100 px-6 py-2 focus-visible:ring-1 focus-visible:ring-gray-300"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          
          {isLoggedIn ? (
            <>
              <Button 
                onClick={handleUploadClick}
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6"
              >
                Upload Video
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-600 text-white text-sm font-medium">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48" align="end">
                  <div className="space-y-2">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{getDisplayName()}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout}
                      className="w-full justify-start text-left"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button 
              onClick={() => setShowLoginDialog(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>Sign in to your Hosur Recipes account</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => {
                  setShowLoginDialog(false);
                  setShowSignUpDialog(true);
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={showSignUpDialog} onOpenChange={setShowSignUpDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Hosur Recipes</DialogTitle>
            <DialogDescription>Create your account to start sharing recipes</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-username">Username</Label>
              <Input
                id="signup-username"
                type="text"
                value={signUpUsername}
                onChange={(e) => setSignUpUsername(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button 
                onClick={() => {
                  setShowSignUpDialog(false);
                  setShowLoginDialog(true);
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Video Upload Modal */}
      <VideoUploadModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
      />
    </>
  );
};

export default Navigation;
