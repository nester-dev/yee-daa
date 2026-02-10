export const selectRecipeTitle = (state: RootState) =>
  state.newRecipeSlice.title;

export const selectRecipeDescription = (state: RootState) =>
  state.newRecipeSlice.description;

export const selectRecipePortions = (state: RootState) =>
  state.newRecipeSlice.portions;

export const selectRecipeTime = (state: RootState) => state.newRecipeSlice.time;

export const selectRecipeCategories = (state: RootState) =>
  state.newRecipeSlice.categoriesOptions;

export const selectRecipeIngredients = (state: RootState) =>
  state.newRecipeSlice.ingredients;

export const selectRecipeSteps = (state: RootState) =>
  state.newRecipeSlice.steps;
