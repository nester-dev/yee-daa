import { type FC, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router";

import { DeleteRecipeModal } from "@/features/delete-recipe";

import BookmarkIcon from "@/shared/assets/icons/bookmark-heart.svg?react";
import LikeIcon from "@/shared/assets/icons/emoji-heart-eyes.svg?react";
import PencilIcon from "@/shared/assets/icons/pencil-icon.svg?react";
import TrashIcon from "@/shared/assets/icons/trash-icon.svg?react";
import { ROUTE_PATHS } from "@/shared/config/route-paths";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./recipe-info.module.scss";

type TProps = {
  isAuthor: boolean;
  id: string;
};

const RecipeInfoActions: FC<TProps> = ({ isAuthor, id }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { category, subcategory, recipeId } = useParams();

  const handleEditRecipe = () => {
    if (category && subcategory && recipeId) {
      navigate(
        generatePath(
          `${ROUTE_PATHS.EDIT_RECIPE}/:category/:subcategory/:recipeId`,
          {
            category: category,
            subcategory: subcategory,
            recipeId: recipeId,
          },
        ),
      );
    }
  };

  const handleDeleteRecipe = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className={styles.actions}>
        {isAuthor ? (
          <UiIconButton onClick={handleDeleteRecipe}>
            <TrashIcon className={styles.trash} />
          </UiIconButton>
        ) : (
          <UiButton icon={<LikeIcon />}>
            <UiTypography fontWeight="semibold">Оценить рецепт</UiTypography>
          </UiButton>
        )}

        {isAuthor ? (
          <UiButton
            icon={<PencilIcon />}
            variant="outlined"
            onClick={handleEditRecipe}
          >
            <UiTypography fontWeight="semibold">
              Редактировать рецепт
            </UiTypography>
          </UiButton>
        ) : (
          <UiButton icon={<BookmarkIcon />} color="success">
            <UiTypography fontWeight="semibold">
              Сохранить в закладки
            </UiTypography>
          </UiButton>
        )}
      </div>
      <DeleteRecipeModal
        isOpen={isDeleteModalOpen}
        recipeId={id}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default RecipeInfoActions;
