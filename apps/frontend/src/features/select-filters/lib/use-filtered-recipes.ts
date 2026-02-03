import {
  selectAllergens,
  selectGarnishFilter,
  selectIsFiltersApplied,
  selectMeatFilter,
} from "@/features/select-filters";

import {
  type GetRecipesParams,
  useGetAllRecipesQuery,
} from "@/entities/recipe";

import { useAppSelector } from "@/shared/lib/hooks.ts";

export const useFilteredRecipes = (params: GetRecipesParams) => {
  const meatFilters = useAppSelector(selectMeatFilter);
  const garnishFilters = useAppSelector(selectGarnishFilter);
  const allergens = useAppSelector(selectAllergens);
  const isFiltersApplied = useAppSelector(selectIsFiltersApplied);

  const filters = {
    meat: meatFilters.join(","),
    garnish: garnishFilters.join(","),
    allergens: allergens.map((allergen) => allergen.value).join(","),
  };

  return useGetAllRecipesQuery({
    ...(isFiltersApplied ? filters : {}),
    ...params,
  });
};
