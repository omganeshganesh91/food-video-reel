
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Clock, Users, ChefHat } from "lucide-react";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipes = {
    "1": {
      title: "Carne Asada",
      image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=800&h=600&fit=crop",
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
    "2": {
      title: "Greek Rice",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=600&fit=crop",
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
    "3": {
      title: "Vegetable Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=600&fit=crop",
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
    "4": {
      title: "Banana Pancakes",
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop",
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
  };

  const recipe = recipes[id as keyof typeof recipes];

  if (!recipe) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation isLoggedIn={true} onLogout={() => navigate('/')} />
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Recipe not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation isLoggedIn={true} onLogout={() => navigate('/')} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recipe Image */}
          <div className="aspect-square rounded-xl overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Recipe Header */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>
              
              <div className="flex gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Prep: {recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Cook: {recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{recipe.servings}</span>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <Card className="rounded-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tools */}
          <Card className="rounded-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ChefHat size={20} />
                Tools
              </h2>
              <ul className="space-y-3">
                {recipe.tools.map((tool, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {tool}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Instructions */}
          <Card className="rounded-xl lg:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700 flex">
                    <span className="font-bold text-blue-600 mr-3 flex-shrink-0">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
