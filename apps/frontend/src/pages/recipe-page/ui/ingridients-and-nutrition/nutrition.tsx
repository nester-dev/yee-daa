import type { FC } from "react";

import type { RecipeType } from "@/entities/recipe";

import { UiTypography } from "@/shared/ui/ui-typography";

import { NUTRITION_TYPE } from "../../model/types.ts";

import NutritionItem from "./nutrition-item.tsx";

import styles from "./index.module.scss";

const Nutrition: FC<Partial<Pick<RecipeType, "nutritionValue">>> = ({
  nutritionValue = {},
}) => {
  return (
    <div>
      <UiTypography variant="sm" className={styles.nutrition__note}>
        * Калорийность на 1 порцию
      </UiTypography>
      <div className={styles.nutrition}>
        {Object.entries(nutritionValue).map(([key, value]) => (
          <NutritionItem
            key={key}
            type={NUTRITION_TYPE[key as keyof typeof NUTRITION_TYPE]}
            value={String(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
