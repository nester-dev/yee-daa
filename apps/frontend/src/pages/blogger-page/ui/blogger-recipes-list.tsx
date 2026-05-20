import { useState } from "react";
import { useParams } from "react-router";

import { RecipeCard, useGetRecipesByUserIdQuery } from "@/entities/recipe";

import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogger-page.module.scss";

const BloggerRecipesList = () => {
  const userId = useParams()?.bloggerId || "";
  const { data: recipesData } = useGetRecipesByUserIdQuery(userId);
  const [showAll, setShowAll] = useState(false);
  const recipes = recipesData?.recipes ?? [];
  const showLoadMoreButton = !showAll && recipes.length > 8;
  const visibleRecipes = showAll ? recipes : recipes.slice(0, 8);

  if (!recipesData) {
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
