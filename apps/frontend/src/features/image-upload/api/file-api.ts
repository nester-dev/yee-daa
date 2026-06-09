import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";

import type { TImage } from "../model/types";

export const fileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<TImage, FormData>({
      query: (formData) => ({
        url: ApiConfig.FILE_UPLOAD,
        method: HttpMethod.POST,
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
