import { categories, categoriesAdapter } from "../model/slice.ts";
import type { Category } from "../model/types.ts";

export const categoriesSelectors = categoriesAdapter.getSelectors(
  (state: RootState) => state[categories.name],
);

export const selectCategoriesById = (
  state: RootState,
  categoryIds: Category["_id"][],
) => categoryIds.map((id) => categoriesSelectors.selectById(state, id));
