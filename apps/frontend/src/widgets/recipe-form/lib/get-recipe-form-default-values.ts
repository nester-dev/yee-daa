import type { DraftRecipeType, RecipeType } from "@/entities/recipe";

import { getSubcategoryOptions } from "./get-subcategory-options";

export const getRecipeFormDefaultValues = (
  data: DraftRecipeType | RecipeType,
) => ({
  ...data,
  categories: getSubcategoryOptions(data.categoriesIds) || [],
  ingredients:
    data.ingredients?.map((item) => ({
      title: item.title || "",
      count: item.count || "",
      measureUnit: {
        value: item.measureUnit || "",
        label: item.measureUnit || "",
      },
    })) || [],
  steps:
    data.steps?.map((item) => ({
      image: item.image || "",
      description: item.description || "",
    })) || [],
});
