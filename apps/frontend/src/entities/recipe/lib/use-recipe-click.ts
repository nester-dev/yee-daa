import { generatePath, useNavigate } from "react-router";

import { type Category } from "@/entities/category";
import { getRecipeCategories, type RecipeType } from "@/entities/recipe";

export const useRecipeClick = () => {
  const navigate = useNavigate();

  return (recipe: RecipeType, data: Category[]) => {
    const categories = getRecipeCategories(recipe, data);

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
