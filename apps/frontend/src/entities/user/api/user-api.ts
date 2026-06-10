import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";
import {
  recipeInvalidateKey,
  userInvalidateKey,
} from "@/shared/api/invalidate-keys";
import { decodeAccessToken } from "@/shared/api/jwt-decode";

import type { User } from "../model/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNote: build.mutation<void, { text: string }>({
      query: (body) => ({
        url: ApiConfig.NOTE,
        method: HttpMethod.POST,
        body,
      }),
      invalidatesTags: () => [
        { type: recipeInvalidateKey, userId: decodeAccessToken()?.userId },
      ],
    }),
    deleteNote: build.mutation<void, string>({
      query: (id) => ({
        url: `${ApiConfig.NOTE}/${id}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: () => [
        { type: recipeInvalidateKey, userId: decodeAccessToken()?.userId },
      ],
    }),
    getMe: build.query<User, void>({
      query: () => ({
        url: ApiConfig.ME,
        method: HttpMethod.GET,
      }),
      providesTags: () => [userInvalidateKey],
    }),
  }),
});

export const { useGetMeQuery, useCreateNoteMutation, useDeleteNoteMutation } =
  userApi;
