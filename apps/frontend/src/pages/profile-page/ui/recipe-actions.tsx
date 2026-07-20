import type { FC } from "react";

import { useDeleteDraftRecipeMutation } from "@/entities/recipe";

import { matchHttpError } from "@/shared/api/match-http-error";
import TrashIcon from "@/shared/assets/icons/trash-icon.svg?react";
import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./profile-page.module.scss";

type TProps = {
  recipeId: string;
};

export const DraftRecipeActions: FC<TProps> = ({ recipeId }) => {
  const [deleteDraftRecipe] = useDeleteDraftRecipeMutation();

  const handleDeleteDraft = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteDraftRecipe(recipeId).unwrap();
      showNotification({
        title: "Черновик успешно удален.",
        variant: "success",
      });
    } catch (error) {
      matchHttpError(error, {
        default: () => {
          showNotification({
            title: "Ошибка сервера",
            text: "Попробуйте удалить черновик позже.",
            variant: "error",
          });
        },
      });
    }
  };

  return (
    <div className={styles.actions}>
      <UiButton icon={<TrashIcon />} size="sm" onClick={handleDeleteDraft} />
      <EditRecipeButton isDraft />
    </div>
  );
};

type TEditRecipeProps = {
  isDraft?: boolean;
  className?: string;
};

export const EditRecipeButton: FC<TEditRecipeProps> = ({
  isDraft,
  className,
}) => (
  <UiButton
    size="sm"
    color={isDraft ? "secondary" : "primary"}
    className={className}
  >
    <UiTypography
      color={isDraft ? "white" : "black"}
      variant="sm"
      fontWeight="semibold"
    >
      Редактировать
    </UiTypography>
  </UiButton>
);
