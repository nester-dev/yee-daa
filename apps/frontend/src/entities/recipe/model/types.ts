export type RecipeStepType = {
  stepNumber: number;
  description: string;
  image: string;
};

export type RecipeIngredientType = {
  title: string;
  count: string;
  measureUnit: string;
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
