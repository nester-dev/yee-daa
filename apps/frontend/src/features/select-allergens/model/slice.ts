import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { InitialState, OptionType } from "./types.ts";

const initialState: InitialState = {
  allergens: [],
  isAllergensExcluded: false,
};

export const allergens = createSlice({
  name: "allergensSlice",
  initialState,
  reducers: {
    setAllergens: (state, action: PayloadAction<OptionType[]>) => {
      state.allergens = action.payload;
    },
    toggleExcludeAllergens: (state, action: PayloadAction<boolean>) => {
      state.isAllergensExcluded = action.payload;
    },
  },
});

export const { setAllergens, toggleExcludeAllergens } = allergens.actions;
