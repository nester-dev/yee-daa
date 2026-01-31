export const selectAllergens = (state: RootState) =>
  state.allergensSlice.allergens;
export const selectIsAllergensExcluded = (state: RootState) =>
  state.allergensSlice.isAllergensExcluded;
