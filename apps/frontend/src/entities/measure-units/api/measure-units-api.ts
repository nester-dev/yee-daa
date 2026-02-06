import { ApiConfig, HttpMethod } from "@/shared/api/api.config.ts";
import { baseApi } from "@/shared/api/base-api.ts";

import type { MeasureUnit } from "../model/types.ts";

export const measureUnitsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMeasureUnits: build.query<MeasureUnit[], void>({
      query: () => ({
        url: ApiConfig.MEASURE_UNITS,
        method: HttpMethod.GET,
      }),
    }),
  }),
});

export const { useGetMeasureUnitsQuery } = measureUnitsApi;
