import type { FC } from "react";

import { UiTypography } from "@/shared/ui/ui-typography";

import { nutritionConfig } from "../../config";
import { NUTRITION_TYPE } from "../../model/types.ts";

import styles from "./index.module.scss";

type Props = {
  type: NUTRITION_TYPE;
  value: string;
};

const NutritionItem: FC<Props> = ({ type, value }) => {
  const nutrition = nutritionConfig[type];

  return (
    <div className={styles.nutrition__item}>
      <UiTypography variant="sm">{nutrition.name}</UiTypography>
      <UiTypography variant="xl-4" color="greenDark" fontWeight="medium">
        {value}
      </UiTypography>
      <UiTypography variant="sm" fontWeight="semibold">
        {nutrition.format}
      </UiTypography>
    </div>
  );
};

export default NutritionItem;
