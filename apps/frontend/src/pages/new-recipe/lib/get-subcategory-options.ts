import type { OptionType } from "@/features/select-filters";

import { CATEGORIES_DATA } from "@/entities/category";

export const getSubcategoryOptions = (): OptionType[] => {
  return CATEGORIES_DATA.reduce<OptionType[]>((acc, category) => {
    category.subCategories.forEach((subcategory) => {
      acc.push({
        label: subcategory.title,
        value: subcategory._id,
      });
    });
    return acc;
  }, []);
};
