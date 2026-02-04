import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";
import { setAccessToken } from "@/shared/lib/cookies.ts";

import type {
  AccountRecoveryDto,
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
      async onQueryStarted(_, { queryFulfilled }) {
        const { meta } = await queryFulfilled;
        const token = meta?.response?.headers.get("authentication-access");

        if (token) {
          setAccessToken(token);
        }
      },
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
    resetPassword: build.mutation<void, AccountRecoveryDto>({
      query: (body) => ({
        url: ApiConfig.RESET_PASSWORD,
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
  useResetPasswordMutation,
} = authApi;
