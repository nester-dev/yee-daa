import type { FC } from "react";
import { useNavigate } from "react-router";

import { matchHttpError } from "@/shared/api/match-http-error";
import { ROUTE_PATHS } from "@/shared/config/route-paths";
import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button";
import UiModal from "@/shared/ui/ui-modal/ui-modal";
import { UiTypography } from "@/shared/ui/ui-typography";

import { useDeleteRecipeMutation } from "../api/delete-recipe-api";

import styles from "./delete-recipe.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  recipeId: string;
};

const DeleteRecipeModal: FC<Props> = ({ isOpen, onClose, recipeId }) => {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <UiTypography variant="xl" tag="h1" fontWeight="bold" align="center">
          Удаление рецепта
        </UiTypography>
      }
      content={
        <UiTypography>Вы уверены, что хотите удалить рецепт?</UiTypography>
      }
      footer={<ModalFooter onClose={onClose} recipeId={recipeId} />}
    />
  );
};

export default DeleteRecipeModal;

const ModalFooter: FC<Pick<Props, "onClose" | "recipeId">> = ({
  recipeId,
  onClose,
}) => {
  const navigate = useNavigate();
  const [deleteRecipe] = useDeleteRecipeMutation();

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipeId).unwrap();
      showNotification({
        title: "Рецепт успешно удален",
        variant: "success",
      });
      navigate(ROUTE_PATHS.HOME, { replace: true });
    } catch (error) {
      matchHttpError(error, {
        default: () => {
          showNotification({
            title: "Ошибка сервера",
            text: "Не удалось удалить рецепт",
            variant: "error",
          });
        },
      });
    } finally {
      onClose();
    }
  };

  return (
    <div className={styles.actions}>
      <UiButton color="secondary" size="sm" onClick={handleDelete}>
        <UiTypography variant="lg" color="white" fontWeight="semibold">
          Удалить
        </UiTypography>
      </UiButton>
      <UiButton variant="outlined" onClick={onClose} size="sm">
        <UiTypography variant="lg" fontWeight="semibold">
          Отмена
        </UiTypography>
      </UiButton>
    </div>
  );
};
