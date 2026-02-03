import type { Category } from "@/entities/category";

import type { RecipeType } from "../model/types.ts";

export const getRecipeCategories = (
  recipe: RecipeType,
  categories: Category[],
) => {
  const [categoryId] = recipe.categoriesIds;

  if (!categoryId) {
    return null;
  }

  for (const root of categories) {
    const subCategory = root.subCategories.find(
      (subCategory) => subCategory._id === categoryId,
    );

    if (subCategory) {
      return {
        categoryId: root._id,
        category: root.category,
        categoryTitle: root.title,
        subCategoryId: subCategory._id,
        subCategoryTitle: subCategory.title,
        subCategory: subCategory.category,
      };
    }
  }
  return null;
};
