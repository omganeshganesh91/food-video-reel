import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const mockResults = [
  {
    id: 1,
    title: "Home made egg toast",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
    creator: "JesseJean",
    likes: 24,
    comments: 12,
  },
  // ... you can add more similar items if needed ...
];

const SearchResults = () => {
  const navigate = useNavigate();
  const location = window.location; // client-only
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(mockResults);

  // On mount: parse the URL and populate the field and the heading
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || "";
    setSearchTerm(query);

    // For now: Filter static data, later can add Supabase search here
    const filtered = mockResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.creator.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [location.search]); // listen to changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation isLoggedIn={true} onLogout={() => navigate('/')} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search bar at the top */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Search Results
          </h1>
          <Input
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="max-w-md rounded-full"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          {searchTerm
            ? <>Results for <span className="text-black">&quot;{searchTerm}&quot;</span></>
            : "All Recipes"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length === 0
            ? <div className="text-gray-500 text-lg">No results found.</div>
            : results.map((result) => (
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
                <p className="text-gray-600 text-sm mb-2">By {result.creator}</p>
                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>{result.likes}</span>
                    <svg width={19} height={19} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-1">
                      <path d="M12 21C12 21 6 13.9344 6 9.93335C6 7.23291 8.23858 5 11 5C12.3295 5 13.5 5.89623 14 7.15262C14.5 5.89623 15.6705 5 17 5C19.7614 5 22 7.23291 22 9.93335C22 13.9344 16 21 16 21H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{result.comments}</span>
                    <svg width={19} height={19} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-1">
                      <path d="M21 15.5A2.5 2.5 0 0 1 18.5 18H8.5L3 21V5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
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
