import { generatePath, useNavigate } from "react-router";

import { type Category } from "@/entities/category";
import { getRecipePrimaryCategory, type RecipeType } from "@/entities/recipe";

export const useRecipeClick = () => {
  const navigate = useNavigate();

  return (recipe: RecipeType, data: Category[]) => {
    const categories = getRecipePrimaryCategory(recipe, data);

    if (categories) {
      navigate(
        generatePath("/:category/:subcategory/:recipeId", {
          category: categories.category,
          subcategory: categories.subCategory,
          recipeId: recipe._id,
        }),
      );
    }
  };
};
