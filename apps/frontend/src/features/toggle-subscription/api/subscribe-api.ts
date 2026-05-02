import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";
import { bloggerInvalidateKey } from "@/shared/api/invalidate-keys.ts";
import { decodeAccessToken } from "@/shared/api/jwt-decode.ts";

import { type ToggleSubscriptionDto } from "../model/types.ts";

export const subscribeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    toggleSubscription: build.mutation<void, ToggleSubscriptionDto>({
      query: (data: ToggleSubscriptionDto) => ({
        url: ApiConfig.TOGGLE_SUBSCRIPTION,
        method: HttpMethod.PATCH,
        body: data,
        params: {
          currentUserId: decodeAccessToken()?.userId,
        },
      }),
      invalidatesTags: [bloggerInvalidateKey],
    }),
  }),
});

export const { useToggleSubscriptionMutation } = subscribeApi;
