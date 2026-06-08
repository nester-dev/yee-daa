import type { OptionType } from "@/features/select-filters";

import { CATEGORIES_DATA } from "@/entities/category";

export const getSubcategoryOptions = (
  subcategoryIds?: string[],
): OptionType[] => {
  return CATEGORIES_DATA.reduce<OptionType[]>((acc, category) => {
    category.subCategories.forEach((subcategory) => {
      if (!subcategoryIds) {
        acc.push({
          label: subcategory.title,
          value: subcategory._id,
        });
        return;
      }

      if (subcategoryIds.includes(subcategory._id)) {
        acc.push({
          label: subcategory.title,
          value: subcategory._id,
        });
      }
    });
    return acc;
  }, []);
};
