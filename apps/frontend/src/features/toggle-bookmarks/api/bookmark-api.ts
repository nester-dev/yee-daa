import { HttpMethod } from "@/shared/api/api.config";
import { baseApi } from "@/shared/api/base-api";
import {
  recipeInvalidateKey,
  recipesListInvalidateKey,
} from "@/shared/api/invalidate-keys";

export const bookmarkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    toggleBookmark: build.mutation<void, string>({
      query: (id) => ({
        url: `/recipe/${id}/bookmark`,
        method: HttpMethod.POST,
      }),
      invalidatesTags: [recipesListInvalidateKey, recipeInvalidateKey],
    }),
  }),
});

export const { useToggleBookmarkMutation } = bookmarkApi;
