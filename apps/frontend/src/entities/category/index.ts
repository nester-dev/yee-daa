export type { Category, SubCategory } from "./model/types.ts";
export { categories } from "./model/slice.ts";
export { selectCategoriesById } from "./model/selectors.ts";
export { useGetAllCategoriesQuery } from "./api/category-api.ts";
export { CATEGORIES_DATA } from "./config/data.ts";
