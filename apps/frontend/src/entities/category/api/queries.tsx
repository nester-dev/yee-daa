import type { UseQueryOptions } from "@tanstack/react-query";

import { categoryApi } from "@/shared/api/modules/category.ts";

const categoryQueryKey = "category";

export const categoriesQuery = () =>
  ({
    queryKey: [categoryQueryKey, "list"],
    queryFn: () => categoryApi.getCategories(),
  }) satisfies UseQueryOptions;
