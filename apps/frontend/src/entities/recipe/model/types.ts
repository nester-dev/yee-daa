import type { Nullable } from "@/shared/types";

export type RecipeStepType = {
  stepNumber: number | null;
  description: string | null;
  image: string | null;
};

export type RecipeIngredientType = {
  title: string | null;
  count: string | null;
  measureUnit: string | null;
};

export type RecipeType = {
  title: string;
  description: string;
  time: number;
  image: string;
  meat: string;
  garnish: string;
  portions: number;
  authorId: string;
  categoriesIds: string[];
  steps: RecipeStepType[];
  nutritionValue: {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
  };
  ingredients: RecipeIngredientType[];
  likes: number;
  views: number;
  bookmarks: number;
  createdAt: string;
  _id: string;
};

export type GetRecipesParams = Partial<{
  page: number;
  limit: number;
  allergens: string;
  searchString: string;
  meat: string;
  garnish: string;
  subcategoriesIds: string;
  sortBy: string;
  sortOrder: string;
  transformResponse: boolean;
}>;

export type PublishRecipeDto = {
  title: string;
  description: string;
  time: number;
  categoriesIds: string[];
  portions: number;
  image: string;
  steps: RecipeStepType[];
  ingredients: RecipeIngredientType[];
};

export type DraftRecipeDto = Nullable<PublishRecipeDto | null> & {
  title: string;
};
