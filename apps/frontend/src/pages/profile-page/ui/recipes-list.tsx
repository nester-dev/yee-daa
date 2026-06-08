import type { FC } from "react";
import { useNavigate } from "react-router";

import {
  type DraftRecipeType,
  RecipeCard,
  type RecipeType,
} from "@/entities/recipe";

import { ROUTE_PATHS } from "@/shared/config/route-paths";
import UiListCount from "@/shared/ui/ui-list-count/ui-list-count";
import UiTag from "@/shared/ui/ui-tag/ui-tag";

import EditRecipeButton from "./edit-recipe";

import styles from "./profile-page.module.scss";

type TProps = {
  recipes: RecipeType[];
  drafts: DraftRecipeType[];
};

const RecipesList: FC<TProps> = ({ recipes, drafts }) => {
  const navigate = useNavigate();

  const handleDraftClick = (draftId: string) => {
    navigate(`${ROUTE_PATHS.EDIT_DRAFT_RECIPE}/${draftId}`);
  };

  return (
    <div className={styles.recipes}>
      <div className={styles["recipes-count"]}>
        <UiListCount count={recipes.length}>Мои рецепты</UiListCount>
        <UiListCount count={drafts.length}>Черновики</UiListCount>
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
            actions={
              <EditRecipeButton className={styles["recipes--edit"]} isDraft />
            }
            direction="row"
            onClick={() => handleDraftClick(draft._id)}
          />
        ))}
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} {...recipe} direction="row" />
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
