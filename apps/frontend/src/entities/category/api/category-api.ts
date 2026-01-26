import { type Category } from "@/entities/category";

import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";

import { setCategories } from "../model/slice.ts";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<Category[], void>({
      query: () => ({
        url: ApiConfig.CATEGORY,
        method: HttpMethod.GET,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setCategories(data));
      },
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
