import { useQuery } from "@tanstack/react-query";

import { categoriesQuery } from "../api/queries.tsx";

export const useCategoriesList = () => {
  return useQuery({
    ...categoriesQuery(),
    select: ({ data }) => data,
    staleTime: 5 * 60 * 1000,
  });
};
