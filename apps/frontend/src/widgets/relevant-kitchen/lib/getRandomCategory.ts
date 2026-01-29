import type { Category } from "@/entities/category";

export const getRandomCategory = (data: Category[]) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
};
