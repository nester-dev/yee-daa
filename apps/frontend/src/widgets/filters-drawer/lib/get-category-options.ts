import { CATEGORIES_DATA } from "@/entities/category";

export const getCategoryOptions = () => {
  return CATEGORIES_DATA.map((elem) => ({
    label: elem.title,
    value: elem._id,
  }));
};
