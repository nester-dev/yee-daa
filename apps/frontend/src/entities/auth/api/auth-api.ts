import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";

import type {
  ForgotPasswordDto,
  SignInDto,
  SignUpDto,
} from "../model/types.ts";

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
    forgotPassword: build.mutation<void, ForgotPasswordDto>({
      query: (body) => ({
        url: ApiConfig.FORGOT_PASSWORD,
        method: HttpMethod.POST,
        body,
      }),
    }),
    // verifyOtp: build.mutation()
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
} = authApi;
