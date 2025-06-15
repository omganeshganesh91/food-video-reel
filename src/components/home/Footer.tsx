
const Footer = () => (
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
      {/* Copyright section */}
      <div>
        <p className="text-xs text-gray-300 mb-1">
          © {new Date().getFullYear()} <span className="text-gray-400">Hosur Recipes</span> Built by Out of Pâtée
        </p>
      </div>
    </div>
  </footer>
);
export default Footer;

