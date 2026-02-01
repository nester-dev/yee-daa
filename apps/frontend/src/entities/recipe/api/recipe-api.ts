import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";
import type { BaseQueryResponse } from "@/shared/api/types.ts";

import type { GetRecipeParams, RecipeType } from "../model/types.ts";

export const recipeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRecipes: build.query<BaseQueryResponse<RecipeType>, GetRecipeParams>({
      query: (params) => ({
        url: ApiConfig.RECIPE,
        method: HttpMethod.GET,
        params,
      }),
    }),
  }),
});

export const { useGetAllRecipesQuery, useLazyGetAllRecipesQuery } = recipeApi;
