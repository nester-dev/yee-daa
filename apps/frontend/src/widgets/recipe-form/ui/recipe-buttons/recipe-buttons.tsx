import type { FC } from "react";

import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./recipe-buttons.module.scss";

type Props = {
  onDraftClick: () => void;
  onPublishClick: () => void;
};

const RecipeButtons: FC<Props> = ({ onDraftClick, onPublishClick }) => {
  return (
    <div className={styles.actions}>
      <UiButton onClick={onDraftClick}>
        <UiTypography variant="lg" fontWeight="semibold">
          Сохранить черновик
        </UiTypography>
      </UiButton>
      <UiButton color="secondary" onClick={onPublishClick}>
        <UiTypography variant="lg" fontWeight="semibold" color="white">
          Опубликовать рецепт
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default RecipeButtons;
