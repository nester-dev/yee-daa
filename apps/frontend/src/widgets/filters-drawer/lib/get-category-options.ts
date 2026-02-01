import { MENU_DATA } from "@/features/menu/config/data.ts";

export const getCategoryOptions = () => {
  return MENU_DATA.map((elem) => ({ label: elem.title, value: elem._id }));
};
