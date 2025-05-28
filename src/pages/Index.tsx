
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sampleRecipes = [
    {
      id: 1,
      title: "Carne Asada",
      image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=400&h=300&fit=crop",
      tags: ["Prep", "15min", "Cook", "5min"]
    },
    {
      id: 2,
      title: "Greek Rice",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d513?w=400&h=300&fit=crop",
      tags: ["Prep", "10min", "Cook", "5min"]
    },
    {
      id: 3,
      title: "Vegetable Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
      tags: ["Prep", "15min", "Cook", "5min"]
    },
    {
      id: 4,
      title: "Banana Pancakes",
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop",
      tags: ["Prep", "10min", "Cook", "5min"]
    }
  ];

  return (
    <div className={`min-h-screen bg-white font-inter transition-all duration-600 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/ba582a4b-544a-4d0a-b06d-01cdd86c70d2.png')`
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Hosur Recipes</h1>
          <p className="text-xl mb-8">No Fluff, Just Recipes</p>
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
        </div>
      </div>

      {/* Recipes Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recipes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-xl"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <div className="aspect-video">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2023 <span className="text-gray-400">Hosur Recipes</span> Built by Out of Pâtée</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
