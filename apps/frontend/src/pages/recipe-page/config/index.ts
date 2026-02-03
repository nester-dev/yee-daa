import type { Variants } from "motion";

import { NUTRITION_TYPE } from "../model/types.ts";

export const nutritionConfig = {
  [NUTRITION_TYPE.calories]: {
    name: "калорийность",
    format: "ККАЛ",
  },
  [NUTRITION_TYPE.protein]: {
    name: "белки",
    format: "ГРАММ",
  },
  [NUTRITION_TYPE.fats]: {
    name: "жиры",
    format: "ГРАММ",
  },
  [NUTRITION_TYPE.carbohydrates]: {
    name: "углеводы",
    format: "ГРАММ",
  },
};

export const ingredientItemVariants: Variants = {
  rest: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  hover: {
    y: -3,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};
