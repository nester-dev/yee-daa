import type { FC } from "react";
import { useParams } from "react-router";

import { NewRecipesSection } from "@/widgets/new-recipes-section";

import { useBookmarks } from "@/features/toggle-bookmarks/index.ts";

import { useGetRecipeByIdQuery } from "@/entities/recipe";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

import IngredientsAndNutrition from "./ingridients-and-nutrition/ingredients-and-nutrition.tsx";
import RecipeInfo from "./recipe-info/recipe-info.tsx";
import RecipeSteps from "./recipe-steps/recipe-steps.tsx";

import styles from "./recipe-page.module.scss";

const RecipePage: FC = () => {
  const { recipeId } = useParams();

  const { data } = useGetRecipeByIdQuery(recipeId!, { skip: !recipeId });
  const { isBookmarked } = useBookmarks(recipeId!);

  return (
    <UiContentContainer>
      <RecipeInfo {...data} isBookmarked={isBookmarked} />
      <div className={styles.container}>
        <IngredientsAndNutrition
          nutritionValue={data?.nutritionValue}
          ingredients={data?.ingredients}
        />
        <RecipeSteps steps={data?.steps} />
      </div>
      <NewRecipesSection />
    </UiContentContainer>
  );
};

export default RecipePage;
