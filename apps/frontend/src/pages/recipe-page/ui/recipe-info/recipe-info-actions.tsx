import type { FC } from "react";

import BookmarkIcon from "@/shared/assets/icons/bookmark-heart.svg?react";
import LikeIcon from "@/shared/assets/icons/emoji-heart-eyes.svg?react";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./recipe-info.module.scss";

const RecipeInfoActions: FC = () => {
  return (
    <div className={styles.actions}>
      <UiButton icon={<LikeIcon />}>
        <UiTypography fontWeight="semibold">Оценить рецепт</UiTypography>
      </UiButton>

      <UiButton icon={<BookmarkIcon />} color="success">
        <UiTypography fontWeight="semibold">Сохранить в закладки</UiTypography>
      </UiButton>
    </div>
  );
};

export default RecipeInfoActions;
