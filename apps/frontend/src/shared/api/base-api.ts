import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { HttpStatus } from "@/shared/api/http-status.ts";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/shared/lib/cookies.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions, ...rest) => {
  let result = await baseQuery(args, api, extraOptions, ...rest);

  if (result.error?.status === HttpStatus.FORBIDDEN) {
    const refreshResult = await baseQuery(
      {
        url: ApiConfig.REFRESH_TOKEN,
        method: HttpMethod.POST,
      },
      api,
      extraOptions,
    );

    if (refreshResult.meta?.response?.headers) {
      const newAccessToken = refreshResult.meta.response.headers.get(
        "authentication-access",
      );

      if (newAccessToken) {
        setAccessToken(newAccessToken);

        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      removeAccessToken();
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});
