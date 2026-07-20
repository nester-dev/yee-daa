import type { FC } from "react";

import {
  useBookmarks,
  useToggleBookmarkMutation,
} from "@/features/toggle-bookmarks";

import { matchHttpError } from "@/shared/api/match-http-error";
import BookMarkIcon from "@/shared/assets/icons/bookmark-heart.svg?react";
import BookMarkRemoveIcon from "@/shared/assets/icons/bookmark-remove.svg?react";
import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./juciest.module.scss";

type TProps = {
  recipeId: string;
};

const ActionButtons: FC<TProps> = ({ recipeId }) => {
  const { isBookmarked } = useBookmarks(recipeId);

  const [toggleBookmark] = useToggleBookmarkMutation();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      toggleBookmark(recipeId);
    } catch (error) {
      matchHttpError(error, {
        default: () => {
          showNotification({
            title: "Ошибка сервера",
            text: "Попробуйте немного позже",
            variant: "error",
          });
        },
      });
    }
  };

  return (
    <div className={styles.actions}>
      <UiButton
        size="sm"
        icon={isBookmarked ? <BookMarkRemoveIcon /> : <BookMarkIcon />}
        onClick={handleToggle}
      >
        <UiTypography
          variant="sm"
          fontWeight="semibold"
          className={styles.save}
        >
          {isBookmarked ? "Удалить" : "Сохранить"}
        </UiTypography>
      </UiButton>

      <UiButton color="secondary" size="sm">
        <UiTypography color="white" variant="sm" fontWeight="semibold">
          Готовить
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default ActionButtons;
