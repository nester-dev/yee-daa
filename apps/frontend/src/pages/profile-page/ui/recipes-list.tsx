import type { FC } from "react";

import {
  type DraftRecipeType,
  RecipeCard,
  type RecipeType,
} from "@/entities/recipe";

import UiListCount from "@/shared/ui/ui-list-count/ui-list-count";
import UiTag from "@/shared/ui/ui-tag/ui-tag";

import EditRecipeButton from "./edit-recipe";

import styles from "./profile-page.module.scss";

type TProps = {
  recipes: RecipeType[];
  drafts: DraftRecipeType[];
};

const RecipesList: FC<TProps> = ({ recipes, drafts }) => {
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
