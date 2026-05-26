import { useState } from "react";

import { RecipeCard, type RecipeType } from "@/entities/recipe";

import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogger-page.module.scss";

type TProps = {
  recipes: RecipeType[];
};

const BloggerRecipesList = ({ recipes }: TProps) => {
  const [showAll, setShowAll] = useState(false);
  const showLoadMoreButton = !showAll && recipes.length > 8;
  const visibleRecipes = showAll ? recipes : recipes.slice(0, 8);

  if (!recipes) {
    return null;
  }

  return (
    <div>
      <div className={styles.list}>
        {visibleRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} {...recipe} direction="row" />
        ))}
      </div>
      {showLoadMoreButton && (
        <UiButton
          color="success"
          className={styles["load-more"]}
          onClick={() => setShowAll(true)}
        >
          <UiTypography variant="sm" fontWeight="semibold">
            Загрузить еще
          </UiTypography>
        </UiButton>
      )}
    </div>
  );
};

export default BloggerRecipesList;
