import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { OptionType } from "@/features/select-filters";

import type { RecipeStepType } from "@/entities/recipe";

import { EmptyIngredient, EmptyStep } from "../config";
import type { IngredientType, InitialState } from "../model/types.ts";

export const initialState: InitialState = {
  title: "",
  description: "",
  image: "",
  portions: 1,
  time: 5,
  categoriesOptions: [],
  ingredients: {
    0: EmptyIngredient,
  },
  steps: [
    {
      ...EmptyStep,
      stepNumber: 1,
    },
  ],
};

export const newRecipe = createSlice({
  name: "newRecipeSlice",
  initialState,
  reducers: {
    setRecipeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setRecipeDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    incrementPortion: (state) => {
      state.portions++;
    },
    decrementPortion: (state) => {
      if (state.portions > 1) {
        state.portions--;
      }
    },
    incrementTime: (state) => {
      state.time++;
    },
    decrementTime: (state) => {
      if (state.time > 1) {
        state.time--;
      }
    },
    setRecipeCategories: (state, action: PayloadAction<OptionType[]>) => {
      state.categoriesOptions = action.payload;
    },
    setRecipeIngredient: (
      state,
      action: PayloadAction<{ key: number; ingredient: IngredientType }>,
    ) => {
      const { key, ingredient } = action.payload;

      state.ingredients[key] = ingredient;
    },
    removeRecipeIngredient: (state, action: PayloadAction<number>) => {
      const keyToRemove = action.payload;

      state.ingredients = Object.entries(state.ingredients).reduce(
        (acc, [key, ingredient]) => {
          const ingredientKey = parseInt(key, 10);

          if (ingredientKey !== keyToRemove) {
            return { ...acc, [ingredientKey]: ingredient };
          }

          return acc;
        },
        {} as Record<number, IngredientType>,
      );
    },
    setRecipeStep: (state, action: PayloadAction<RecipeStepType>) => {
      state.steps.push(action.payload);
    },
    deleteRecipeStep: (state, action: PayloadAction<number>) => {
      state.steps.splice(action.payload, 1);
    },
    updateRecipeStep: (
      state,
      action: PayloadAction<{ stepIndex: number; step: RecipeStepType }>,
    ) => {
      const { stepIndex, step } = action.payload;
      state.steps.splice(stepIndex, 1, step);
    },
    resetRecipeSteps: (state) => {
      state.steps = [
        {
          ...EmptyStep,
          stepNumber: 1,
        },
      ];
    },
  },
});

export const {
  setRecipeTitle,
  setRecipeDescription,
  incrementPortion,
  decrementPortion,
  incrementTime,
  decrementTime,
  setRecipeCategories,
  setRecipeIngredient,
  removeRecipeIngredient,
  setRecipeStep,
  deleteRecipeStep,
  updateRecipeStep,
  resetRecipeSteps,
} = newRecipe.actions;
