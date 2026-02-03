import { isAfter, parseISO } from "date-fns";

import type { RecipeType } from "@/entities/recipe";

import { validateImageUrl } from "@/shared/lib/validate-image-url.ts";

export const getActualRecipes = async (recipes: RecipeType[]) => {
  const domain = import.meta.env.VITE_ASSETS_URL;
  const cutoffDate = parseISO("2025-04-07T00:00:00.000Z");

  const checks = await Promise.all(
    recipes.map(async (recipe) => {
      const url = `${domain}${recipe.image}`;
      const isValid = await validateImageUrl(url);
      return isValid ? recipe : null;
    }),
  );

  return checks.filter(
    (recipe): recipe is RecipeType =>
      recipe !== null && !isAfter(parseISO(recipe.createdAt), cutoffDate),
  );
};
