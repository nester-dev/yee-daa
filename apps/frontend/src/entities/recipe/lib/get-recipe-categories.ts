import type { Category } from "@/entities/category";

export const getRecipeCategories = (
  allCategories: Category[],
  recipeCategoryIds: string[] = [],
): Category[] =>
  allCategories.filter((root) =>
    root.subCategories.some((sub) => recipeCategoryIds.includes(sub._id)),
  );
