import type { FC } from "react";
import { useNavigate } from "react-router";

import { CATEGORIES_DATA } from "@/entities/category";
import {
  type DraftRecipeType,
  RecipeCard,
  type RecipeType,
  useRecipeClick,
} from "@/entities/recipe";

import { ROUTE_PATHS } from "@/shared/config/route-paths";
import { useIsAboveLaptopDevice } from "@/shared/lib/use-media-query";
import UiListCount from "@/shared/ui/ui-list-count/ui-list-count";
import UiTag from "@/shared/ui/ui-tag/ui-tag";

import { DraftRecipeActions, EditRecipeButton } from "./recipe-actions";

import styles from "./profile-page.module.scss";

type TProps = {
  recipes: RecipeType[];
  drafts: DraftRecipeType[];
};

const RecipesList: FC<TProps> = ({ recipes, drafts }) => {
  const navigate = useNavigate();
  const handleRecipeClick = useRecipeClick();
  const isAboveLaptopDevice = useIsAboveLaptopDevice();

  const handleDraftClick = (draftId: string) => {
    navigate(`${ROUTE_PATHS.EDIT_DRAFT_RECIPE}/${draftId}`);
  };

  const onRecipeClick = (recipe: RecipeType) => {
    handleRecipeClick(
      recipe,
      CATEGORIES_DATA,
      `${ROUTE_PATHS.EDIT_RECIPE}/:category/:subcategory/:recipeId`,
    );
  };

  return (
    <div className={styles.recipes}>
      <div className={styles["recipes-count"]}>
        <UiListCount count={recipes.length} size="medium">
          Мои рецепты
        </UiListCount>
        <UiListCount count={drafts.length} size="medium">
          Черновики
        </UiListCount>
      </div>

      <div className={styles["recipes-list"]}>
        {drafts.map((draft) => (
          <RecipeCard
            key={draft._id}
            {...draft}
            cardHeader={
              <UiTag color="blackSoft" className={styles["recipes-list--tag"]}>
                Черновик
              </UiTag>
            }
            actions={<DraftRecipeActions recipeId={draft._id} />}
            direction="row"
            hideDescription={isAboveLaptopDevice}
            onClick={() => handleDraftClick(draft._id)}
          />
        ))}
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            {...recipe}
            direction="row"
            onClick={() => onRecipeClick(recipe)}
            hideDescription={isAboveLaptopDevice}
            actions={
              <EditRecipeButton
                isDraft={false}
                className={styles["actions-edit"]}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
