export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type PaginationParams = {
  limit?: number | string;
  offset?: number;
};
