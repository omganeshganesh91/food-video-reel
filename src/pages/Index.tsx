import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sampleRecipes = [
    {
      id: 1,
      title: "Carne Asada",
      image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=400&h=300&fit=crop",
      description: "Delicious grilled marinated flank steak with Mexican spices, perfect for tacos or served with rice and beans.",
      prepTime: "15min",
      cookTime: "5min",
      servings: "4 servings",
      tags: ["Beef", "Mexican", "Grilled", "Main Course"],
      ingredients: [
        "2 lbs flank steak",
        "1/4 cup lime juice",
        "3 cloves garlic, minced",
        "2 tbsp olive oil",
        "1 tsp cumin",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Marinate the steak in lime juice, garlic, olive oil, and spices for 2 hours.",
        "Preheat grill to high heat.",
        "Grill steak for 3-4 minutes per side for medium-rare.",
        "Let rest for 5 minutes, then slice against the grain.",
        "Serve with warm tortillas and toppings."
      ],
      tools: ["Grill", "Mixing Bowl", "Sharp Knife", "Cutting Board"]
    },
    {
      id: 2,
      title: "Greek Rice",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
      description: "Traditional Greek rice pilaf with tomatoes, herbs, and aromatic spices. A perfect side dish for Mediterranean meals.",
      prepTime: "10min",
      cookTime: "25min",
      servings: "6 servings",
      tags: ["Greek", "Vegetarian", "Rice", "Side Dish"],
      ingredients: [
        "2 cups long-grain rice",
        "3 cups chicken or vegetable broth",
        "1 large onion, diced",
        "2 tomatoes, diced",
        "1/4 cup olive oil",
        "2 tsp dried oregano",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Heat olive oil in a large pot over medium heat.",
        "Sauté onion until translucent, about 5 minutes.",
        "Add rice and stir for 2 minutes until lightly toasted.",
        "Add tomatoes, broth, oregano, salt, and pepper.",
        "Bring to boil, then reduce heat and simmer covered for 18-20 minutes.",
        "Let stand 5 minutes before fluffing with a fork."
      ],
      tools: ["Large Pot with Lid", "Wooden Spoon", "Fork", "Measuring Cups"]
    },
    {
      id: 3,
      title: "Vegetable Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
      description: "Hearty and nutritious vegetable soup packed with seasonal vegetables in a flavorful broth.",
      prepTime: "15min",
      cookTime: "30min",
      servings: "8 servings",
      tags: ["Vegetarian", "Healthy", "Soup", "Comfort Food"],
      ingredients: [
        "2 tbsp olive oil",
        "1 large onion, diced",
        "3 carrots, sliced",
        "3 celery stalks, diced",
        "6 cups vegetable broth",
        "2 cups diced tomatoes",
        "1 cup green beans, chopped",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Heat olive oil in a large pot over medium heat.",
        "Add onion, carrots, and celery. Cook for 8 minutes.",
        "Add broth, tomatoes, and green beans.",
        "Bring to boil, then simmer for 20 minutes.",
        "Season with salt and pepper to taste.",
        "Serve hot with crusty bread."
      ],
      tools: ["Large Soup Pot", "Ladle", "Cutting Board", "Sharp Knife"]
    },
    {
      id: 4,
      title: "Banana Pancakes",
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop",
      description: "Fluffy and delicious banana pancakes made with ripe bananas and a hint of vanilla. Perfect for weekend breakfast.",
      prepTime: "10min",
      cookTime: "15min",
      servings: "4 servings",
      tags: ["Breakfast", "Sweet", "Pancakes", "Banana"],
      ingredients: [
        "2 ripe bananas, mashed",
        "2 cups all-purpose flour",
        "2 tbsp sugar",
        "2 tsp baking powder",
        "1/2 tsp salt",
        "1 3/4 cups milk",
        "2 eggs",
        "1/4 cup melted butter"
      ],
      instructions: [
        "Mix flour, sugar, baking powder, and salt in a large bowl.",
        "In another bowl, whisk together milk, eggs, and melted butter.",
        "Add wet ingredients to dry ingredients and stir until just combined.",
        "Fold in mashed bananas.",
        "Cook pancakes on griddle over medium heat for 2-3 minutes per side.",
        "Serve warm with maple syrup and fresh fruit."
      ],
      tools: ["Mixing Bowls", "Whisk", "Griddle or Pan", "Spatula"]
    }
  ];

  return (
    <div className={`min-h-screen bg-white font-inter transition-all duration-600 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navigation isLoggedIn={!!user} />
      
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
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Prep: {recipe.prepTime}</span>
                  <span>Cook: {recipe.cookTime}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.slice(0, 2).map((tag, index) => (
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
      <footer className="bg-gray-900 text-white py-6 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Learn Cooking Resource Link */}
          <div>
            <a
              href="https://thecookingbooks.com/how-to-cook-biryani-at-home/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-100 hover:text-yellow-400 underline underline-offset-4 font-medium transition-colors"
            >
              🍳 Learn Cooking: How to Cook Biryani at Home
            </a>
          </div>
          {/* Copyright and food order link section */}
          <div>
            <p className="text-xs text-gray-300 mb-1">
              © {new Date().getFullYear()} <span className="text-gray-400">Hosur Recipes</span> Built by Out of Pâtée
            </p>
            <a
              href="https://www.zomato.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full ml-0 md:ml-2 inline-block transition-colors"
            >
              Order Food Online at Zomato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
