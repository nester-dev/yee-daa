import {
  hasDataInFetchError,
  isFetchBaseQueryError,
} from "@/shared/api/is-query-error.ts";

type HttpErrorHandler = (message?: string) => void;

type HttpErrorMatchers = Partial<Record<number | "default", HttpErrorHandler>>;

export const matchHttpError = (error: unknown, matchers: HttpErrorMatchers) => {
  if (!isFetchBaseQueryError(error)) {
    return;
  }

  if (!hasDataInFetchError(error)) {
    matchers?.default?.();
    return;
  }
  const status = error.status;

  if (typeof status === "number" && matchers[status]) {
    matchers[status]?.(error.data.message);
    return;
  }
};
