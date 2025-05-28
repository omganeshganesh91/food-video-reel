
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  
  const searchResults = [
    {
      id: 1,
      title: "Spicy Thai Curry",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
      creator: "Chef Mike",
      likes: 156,
      comments: 23
    },
    {
      id: 2,
      title: "Italian Risotto",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      creator: "Anna P.",
      likes: 89,
      comments: 12
    },
    {
      id: 3,
      title: "Fresh Garden Salad",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      creator: "HealthyEats",
      likes: 234,
      comments: 45
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation isLoggedIn={true} onLogout={() => navigate('/')} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Recipes</h1>
          <Input
            placeholder="Search for recipes..."
            className="max-w-md rounded-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((result) => (
            <Card 
              key={result.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-xl"
              onClick={() => navigate(`/video/${result.id}`)}
            >
              <div className="aspect-video">
                <img 
                  src={result.image} 
                  alt={result.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {result.creator}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{result.likes} likes</span>
                  <span>{result.comments} comments</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
