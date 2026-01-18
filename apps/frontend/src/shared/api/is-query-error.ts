import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorData {
  statusCode: number;
  message: string;
}

export const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return typeof error === "object" && error != null && "status" in error;
};

const isErrorData = (data: unknown): data is ErrorData => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  if (!("statusCode" in data) || !("message" in data)) {
    return false;
  }

  return (
    typeof data.statusCode === "number" && typeof data.message === "string"
  );
};

export const hasDataInFetchError = (
  error: unknown,
): error is FetchBaseQueryError & { data: ErrorData } => {
  return (
    isFetchBaseQueryError(error) && "data" in error && isErrorData(error.data)
  );
};
