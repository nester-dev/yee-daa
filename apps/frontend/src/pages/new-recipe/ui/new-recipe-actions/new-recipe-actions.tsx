import type { FC } from "react";

import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./new-recipe-actions.module.scss";

const NewRecipeActions: FC = () => {
  return (
    <div className={styles.actions}>
      <UiButton>
        <UiTypography variant="lg" fontWeight="semibold">
          Сохранить черновик
        </UiTypography>
      </UiButton>
      <UiButton color="secondary">
        <UiTypography variant="lg" fontWeight="semibold" color="white">
          Опубликовать рецепт
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default NewRecipeActions;
