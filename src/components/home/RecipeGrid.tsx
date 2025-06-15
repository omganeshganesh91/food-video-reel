
import RecipeCard from "./RecipeCard";
import type { RecipeCardProps } from "./RecipeCard";

interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  prepTime: string;
  cookTime: string;
  tags: string[];
}

const RecipeGrid = ({ recipes }: { recipes: Recipe[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {recipes.map((recipe) => (
      <RecipeCard
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
        description={recipe.description}
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        tags={recipe.tags}
      />
    ))}
  </div>
);

export default RecipeGrid;
