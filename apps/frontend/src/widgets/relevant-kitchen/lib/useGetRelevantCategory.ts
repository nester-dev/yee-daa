import { useParams } from "react-router";

import { MENU_DATA } from "@/features/menu/config/data.ts";

import { getRandomCategory } from "./getRandomCategory.ts";

export const useGetRelevantCategory = () => {
  const params = useParams();
  const category = getRandomCategory(MENU_DATA);

  if (!params.category) {
    return category;
  }

  return MENU_DATA.find((category) => category.category === params.category);
};
