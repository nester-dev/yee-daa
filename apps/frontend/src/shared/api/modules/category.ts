import { ApiConfig } from "@/shared/api/api.config.ts";
import { axios } from "@/shared/api/api-client.ts";

export type SubCategoryDto = {
  _id: string;
  title: string;
  category: string;
  rootCategoryId: string;
};

export type CategoryDto = {
  _id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  subCategories: SubCategoryDto[];
};

export const categoryApi = {
  getCategories: async () => axios.get<CategoryDto[]>(ApiConfig.CATEGORY),
};
