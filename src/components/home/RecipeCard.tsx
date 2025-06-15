
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  prepTime: string;
  cookTime: string;
  tags: string[];
}

const RecipeCard = ({
  id,
  title,
  image,
  description,
  prepTime,
  cookTime,
  tags,
}: RecipeCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-xl"
      onClick={() => navigate(`/recipe/${id}`)}
    >
      <div className="aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Prep: {prepTime}</span>
          <span>Cook: {cookTime}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;
