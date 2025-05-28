
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = {
    title: "Carne Asada",
    image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=800&h=600&fit=crop",
    prepTime: "15min",
    cookTime: "5min",
    ingredients: [
      "2 lbs flank steak",
      "1/4 cup lime juice",
      "3 cloves garlic, minced",
      "2 tbsp olive oil",
      "1 tsp cumin",
      "Salt and pepper"
    ],
    instructions: [
      "Marinate the steak in lime juice, garlic, olive oil, and spices for 2 hours.",
      "Preheat grill to high heat.",
      "Grill steak for 3-4 minutes per side for medium-rare.",
      "Let rest for 5 minutes, then slice against the grain.",
      "Serve with warm tortillas and toppings."
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation isLoggedIn={true} onLogout={() => navigate('/')} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recipe Image */}
          <div className="aspect-square rounded-xl overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Recipe Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>Prep: {recipe.prepTime}</span>
                <span>Cook: {recipe.cookTime}</span>
              </div>
            </div>
            
            {/* Ingredients */}
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Instructions */}
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium text-purple-600">{index + 1}.</span> {instruction}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
