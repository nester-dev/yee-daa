import { ApiConfig, HttpMethod } from "@/shared/api/api.config";
import { baseApi } from "@/shared/api/base-api";
import { recipesListInvalidateKey } from "@/shared/api/invalidate-keys";

export const deleteRecipeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteRecipe: build.mutation<void, string>({
      query: (id) => ({
        url: `${ApiConfig.RECIPE}/${id}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: [recipesListInvalidateKey],
    }),
  }),
});

export const { useDeleteRecipeMutation } = deleteRecipeApi;
