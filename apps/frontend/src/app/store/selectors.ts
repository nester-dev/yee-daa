import { createSelector } from "@reduxjs/toolkit";

export const selectIsSomeQueryPending = createSelector(
  [(state: RootState) => state.baseApi],
  (baseApi) => {
    const queriesPending = Object.values(baseApi.queries).some(
      (query) => query?.status === "pending",
    );
    const mutationsPending = Object.values(baseApi.mutations).some(
      (mutation) => mutation?.status === "pending",
    );
    return queriesPending || mutationsPending;
  },
);
