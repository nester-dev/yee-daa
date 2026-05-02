import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";
import { bloggerInvalidateKey } from "@/shared/api/invalidate-keys";
import { decodeAccessToken } from "@/shared/api/jwt-decode";
import type { PaginationParams } from "@/shared/types";

import type { GetBloggersResponse } from "../model/types";

export const bloggersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBloggers: build.query<GetBloggersResponse, PaginationParams>({
      query: (params?: PaginationParams) => ({
        url: ApiConfig.BLOGGERS,
        method: HttpMethod.GET,
        params: {
          currentUserId: decodeAccessToken()?.userId,
          ...params,
        },
      }),
      providesTags: [bloggerInvalidateKey],
    }),
  }),
});

export const { useGetBloggersQuery } = bloggersApi;
