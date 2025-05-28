
import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Hosur Recipes</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            No Fluff, Just Recipes - that's our promise at Hosur Recipes.
          </p>
          
          <p className="text-gray-700 mb-6">
            We believe cooking should be simple, accessible, and enjoyable. Our platform brings together 
            food enthusiasts from around the world to share their favorite recipes through engaging video content.
          </p>
          
          <p className="text-gray-700 mb-6">
            Whether you're a seasoned chef or just starting your culinary journey, Hosur Recipes provides 
            a space to discover, create, and share delicious food experiences.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            To make cooking accessible to everyone by providing clear, concise, and creative recipe videos 
            that inspire home cooks to explore new flavors and techniques.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
