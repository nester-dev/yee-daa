import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";

import type { SignInDto, SignUpDto } from "../model/types.ts";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<void, SignUpDto>({
      query: (body) => ({
        url: ApiConfig.REGISTER,
        method: HttpMethod.POST,
        body,
      }),
    }),
    login: build.mutation<void, SignInDto>({
      query: (body) => ({
        url: ApiConfig.LOGIN,
        method: HttpMethod.POST,
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
