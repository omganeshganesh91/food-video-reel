
import { Heart } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface FloatingHeartProps {
  show: boolean;
  onAnimationEnd?: () => void;
}
const FloatingHeart: React.FC<FloatingHeartProps> = ({ show, onAnimationEnd }) => {
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && heartRef.current) {
      // Auto remove heart after animation
      const timer = setTimeout(() => {
        if (onAnimationEnd) onAnimationEnd();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [show, onAnimationEnd]);

  return (
    <div
      ref={heartRef}
      className={`pointer-events-none fixed left-1/2 top-[38%] z-40 transition-opacity duration-700 ${
        show ? "opacity-100 animate-floatUpHeart" : "opacity-0"
      }`}
      style={{
        transform: "translate(-50%, 0)",
        willChange: "transform, opacity",
        display: show ? "block" : "none"
      }}
    >
      <Heart size={64} className="text-red-500 fill-red-400 drop-shadow-xl" />
      <style>
      {`
        @keyframes floatUpHeart {
          0% {
            opacity: 0.9;
            transform: translate(-50%, 0) scale(1);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -32px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -80px) scale(1.1);
          }
        }
        .animate-floatUpHeart {
          animation: floatUpHeart 0.8s cubic-bezier(0.4,0,0.6,1) forwards;
        }
      `}
      </style>
    </div>
  );
};

export default FloatingHeart;
