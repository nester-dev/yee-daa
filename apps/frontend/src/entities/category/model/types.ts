export type SubCategory = {
  id: string;
  title: string;
  category: string;
  rootCategoryId: string;
};

export type Category = {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  subCategories: SubCategory[];
};
