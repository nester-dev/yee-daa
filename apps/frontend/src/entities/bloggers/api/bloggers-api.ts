import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";
import { decodeAccessToken } from "@/shared/api/jwt-decode";

import type { GetBloggersResponse } from "../model/types";

export const bloggersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBloggers: build.query<GetBloggersResponse, void>({
      query: () => ({
        url: ApiConfig.BLOGGERS,
        method: HttpMethod.GET,
        params: {
          currentUserId: decodeAccessToken()?.userId,
        },
      }),
    }),
  }),
});

export const { useGetBloggersQuery } = bloggersApi;
