import { useParams } from "react-router";

import { CATEGORIES_DATA } from "@/entities/category";

import { getRandomCategory } from "./getRandomCategory.ts";

export const useGetRelevantCategory = () => {
  const params = useParams();
  const category = getRandomCategory(CATEGORIES_DATA);

  if (!params.category) {
    return category;
  }

  return CATEGORIES_DATA.find(
    (category) => category.category === params.category,
  );
};
