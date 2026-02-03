import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";
import type { BaseQueryResponse } from "@/shared/api/types.ts";

import { getActualRecipes } from "../lib/get-actual-recipes.ts";
import type { GetRecipesParams, RecipeType } from "../model/types.ts";

export const recipeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRecipes: build.query<BaseQueryResponse<RecipeType>, GetRecipesParams>(
      {
        query: (params) => ({
          url: ApiConfig.RECIPE,
          method: HttpMethod.GET,
          params,
        }),
        transformResponse: async (
          response: BaseQueryResponse<RecipeType>,
          _,
          arg,
        ) => {
          if (arg.transformResponse) {
            return {
              ...response,
              data: await getActualRecipes(response.data),
            };
          }

          return response;
        },
      },
    ),
    getRecipeById: build.query<RecipeType, string>({
      query: (id) => ({
        url: `${ApiConfig.RECIPE}/${id}`,
        method: HttpMethod.GET,
      }),
    }),
  }),
});

export const { useGetAllRecipesQuery, useGetRecipeByIdQuery } = recipeApi;
