import { ApiConfig, HttpMethod } from "@/shared/api/api.config";
import { baseApi } from "@/shared/api/base-api";
import { userInvalidateKey } from "@/shared/api/invalidate-keys";

import type { TChangeAvatarResponse } from "../model/type";

export const changeAvatarApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changeAvatar: build.mutation<TChangeAvatarResponse, FormData>({
      query: (formData) => ({
        url: `${ApiConfig.ME}/photo`,
        method: HttpMethod.POST,
        body: formData,
      }),
      invalidatesTags: [userInvalidateKey],
    }),
  }),
});

export const { useChangeAvatarMutation } = changeAvatarApi;
