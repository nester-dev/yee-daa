import { generatePath, useNavigate } from "react-router";

import { type Category } from "@/entities/category";
import { getRecipePrimaryCategory, type RecipeType } from "@/entities/recipe";

export const useRecipeClick = () => {
  const navigate = useNavigate();

  return (recipe: RecipeType, data: Category[], path?: string) => {
    const categories = getRecipePrimaryCategory(recipe, data);

    if (categories) {
      navigate(
        generatePath(path || "/:category/:subcategory/:recipeId", {
          category: categories.category,
          subcategory: categories.subCategory,
          recipeId: recipe._id,
        }),
      );
    }
  };
};
