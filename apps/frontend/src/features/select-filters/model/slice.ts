import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { InitialState } from "../model/types.ts";

const initialState: InitialState = {
  meat: [],
  garnish: [],
};

export const filters = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    setMeatFilter: (state, action: PayloadAction<string>) => {
      const isExist = state.meat.includes(action.payload);

      if (!isExist) {
        state.meat.push(action.payload);
        return;
      }

      state.meat = state.meat.filter((elem) => elem !== action.payload);
    },
    setGarnishFilter: (state, action: PayloadAction<string>) => {
      const isExist = state.garnish.includes(action.payload);

      if (!isExist) {
        state.garnish.push(action.payload);
        return;
      }

      state.garnish = state.garnish.filter((elem) => elem !== action.payload);
    },
    deleteFilter: (state, action: PayloadAction<string>) => {
      const isMeatFilter = state.meat.includes(action.payload);

      if (isMeatFilter) {
        state.meat = state.meat.filter((elem) => elem !== action.payload);
        return;
      }

      const isGarnishFilter = state.garnish.includes(action.payload);

      if (isGarnishFilter) {
        state.garnish = state.garnish.filter((elem) => elem !== action.payload);
      }
    },
    resetFilters: (state) => {
      state.meat = [];
      state.garnish = [];
    },
  },
});

export const { setMeatFilter, setGarnishFilter, resetFilters, deleteFilter } =
  filters.actions;
