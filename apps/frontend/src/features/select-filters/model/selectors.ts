export const selectMeatFilter = (state: RootState) => state.filtersSlice.meat;
export const selectGarnishFilter = (state: RootState) =>
  state.filtersSlice.garnish;

export const selectAllergens = (state: RootState) =>
  state.filtersSlice.allergens;
export const selectIsAllergensExcluded = (state: RootState) =>
  state.filtersSlice.isAllergensExcluded;
export const selectIsFiltersApplied = (state: RootState) =>
  state.filtersSlice.isFiltersApplied;
