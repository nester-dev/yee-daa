import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";

import type { User } from "../model/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => ({
        url: ApiConfig.ME,
        method: HttpMethod.GET,
      }),
    }),
  }),
});

export const { useGetMeQuery } = userApi;
