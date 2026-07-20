import type { FC } from "react";

import { matchHttpError } from "@/shared/api/match-http-error";
import BookmarkIcon from "@/shared/assets/icons/bookmark-heart.svg?react";
import BookmarkRemoveIcon from "@/shared/assets/icons/bookmark-remove.svg?react";
import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import { useToggleBookmarkMutation } from "../api/bookmark-api";

import styles from "./toggle-bookmark.module.scss";

type TProps = {
  recipeId: string;
  isBookmarked?: boolean;
};

const ToggleBookmarkButton: FC<TProps> = ({ recipeId, isBookmarked }) => {
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

  return isBookmarked ? (
    <UiButton
      icon={<BookmarkRemoveIcon className={styles["bookmark-remove"]} />}
      onClick={handleToggle}
      size="sm"
    >
      <UiTypography fontWeight="semibold">Убрать из сохраненных</UiTypography>
    </UiButton>
  ) : (
    <UiButton icon={<BookmarkIcon />} color="success" onClick={handleToggle}>
      <UiTypography fontWeight="semibold">Сохранить в закладки</UiTypography>
    </UiButton>
  );
};

export default ToggleBookmarkButton;
