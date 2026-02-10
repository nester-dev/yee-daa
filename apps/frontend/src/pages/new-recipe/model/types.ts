import type { OptionType } from "@/features/select-filters";

import type { RecipeStepType } from "@/entities/recipe";

export type IngredientType = {
  title: string;
  count: string;
  measureUnit: OptionType | null;
};

export type InitialState = {
  title: string;
  description: string;
  image: string;
  portions: number;
  time: number;
  categoriesOptions: OptionType[];
  ingredients: Record<number, IngredientType>;
  steps: RecipeStepType[];
};
