import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";

import type {
  ForgotPasswordDto,
  SignInDto,
  SignUpDto,
  VerifyOtpDto,
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
    verifyOtp: build.mutation<void, VerifyOtpDto>({
      query: (body) => ({
        url: ApiConfig.VERIFY_OTP,
        method: HttpMethod.POST,
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} = authApi;
