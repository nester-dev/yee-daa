import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";
import { recipeInvalidateKey } from "@/shared/api/invalidate-keys.ts";
import type { BaseQueryResponse } from "@/shared/api/types.ts";

import { getActualRecipes } from "../lib/get-actual-recipes.ts";
import type {
  DraftRecipeDto,
  GetRecipesByUserIdResponse,
  GetRecipesParams,
  PublishRecipeDto,
  RecipeType,
} from "../model/types.ts";

export const recipeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRecipes: build.query<BaseQueryResponse<RecipeType>, GetRecipesParams>(
      {
        query: (params) => ({
          url: ApiConfig.RECIPE,
          method: HttpMethod.GET,
          params,
        }),
        providesTags: [recipeInvalidateKey],
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
      providesTags: (_, __, id) => [{ type: recipeInvalidateKey, id }],
    }),
    getRecipesByUserId: build.query<GetRecipesByUserIdResponse, string>({
      query: (userId) => ({
        url: `${ApiConfig.RECIPE}/user/${userId}`,
        method: HttpMethod.GET,
      }),
      providesTags: (_, __, userId) => [{ type: recipeInvalidateKey, userId }],
    }),
    createDraftRecipe: build.mutation<void, DraftRecipeDto>({
      query: (body) => ({
        url: ApiConfig.RECIPE_DRAFT,
        method: HttpMethod.POST,
        body,
      }),
    }),
    publishRecipe: build.mutation<void, PublishRecipeDto>({
      query: (body) => ({
        url: ApiConfig.RECIPE,
        method: HttpMethod.POST,
        body,
      }),
      // invalidatesTags: (_, __, { id }) => [
      //   { type: recipeInvalidateKey, id },
      //   recipeInvalidateKey,
      // ],
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useGetRecipeByIdQuery,
  useCreateDraftRecipeMutation,
  usePublishRecipeMutation,
  useGetRecipesByUserIdQuery,
} = recipeApi;
