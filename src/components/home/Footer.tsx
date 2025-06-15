import React from "react";

// You can change this image to any food image hosted in your public assets, or keep as is.
const saladImg = "/lovable-uploads/9eddf970-69ef-4507-9be0-fe3bce99d5cc.png";

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-8 pb-6 mt-24">
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col md:flex-row justify-between items-center gap-8">
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
      {/* New: Order Food Styled Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white/90 rounded-xl p-4 shadow-lg border border-gray-200">
        <img
          src={saladImg}
          alt="Order Salad"
          className="h-20 w-20 object-cover rounded-full border-2 border-purple-200 shadow-md bg-white"
        />
        <div className="text-gray-900 text-left flex flex-col items-start">
          <span className="text-lg font-semibold tracking-tight">Feeling hungry?</span>
          <span className="text-xs text-gray-500 mb-2">Order fresh food delivered at your door</span>
          <button
            className="flex items-center px-5 py-2 border-2 border-gray-900 bg-transparent rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
            onClick={() => alert("Order flow coming soon!")}
          >
            ORDER FOOD NOW
            <span className="ml-2" aria-hidden>→</span>
          </button>
        </div>
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
