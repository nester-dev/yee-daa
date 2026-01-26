import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { Category } from "@/entities/category";

export const categoriesAdapter = createEntityAdapter({
  selectId: (category: Category) => category._id,
});

export const initialState = categoriesAdapter.getInitialState();

export const categories = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      categoriesAdapter.setAll(state, action.payload);
    },
  },
});

export const { setCategories } = categories.actions;
