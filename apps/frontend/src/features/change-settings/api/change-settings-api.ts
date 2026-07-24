import { ApiConfig, HttpMethod } from "@/shared/api/api.config";
import { baseApi } from "@/shared/api/base-api";
import { userInvalidateKey } from "@/shared/api/invalidate-keys";

import type { ChangeSettingsDto } from "../model/types";

export const changeSettingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changeSettings: build.mutation<void, ChangeSettingsDto>({
      query: (dto) => ({
        url: `${ApiConfig.ME}/update-info`,
        method: HttpMethod.PATCH,
        body: dto,
      }),
      invalidatesTags: [userInvalidateKey],
    }),
  }),
});

export const { useChangeSettingsMutation } = changeSettingsApi;
