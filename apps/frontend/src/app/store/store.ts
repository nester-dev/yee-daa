import { configureStore } from "@reduxjs/toolkit";

import { allergens } from "@/features/select-allergens";
import { filters } from "@/features/select-filters";

import { categories } from "@/entities/category";

import { baseApi } from "@/shared/api/base-api.ts";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [categories.name]: categories.reducer,
    [allergens.name]: allergens.reducer,
    [filters.name]: filters.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
