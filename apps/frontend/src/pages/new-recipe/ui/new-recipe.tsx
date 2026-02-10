import type { FC } from "react";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

import AddIngredients from "./add-ingredients/add-ingredients.tsx";
import AddSteps from "./add-steps/add-steps.tsx";
import NewRecipeActions from "./new-recipe-actions/new-recipe-actions.tsx";
import RecipeHeaderSection from "./recipe-header-section/recipe-header-section.tsx";

import styles from "./new-recipe.module.scss";

const NewRecipe: FC = () => {
  return (
    <UiContentContainer>
      <RecipeHeaderSection />
      <div className={styles.section}>
        <AddIngredients />
        <AddSteps />
        <NewRecipeActions />
      </div>
    </UiContentContainer>
  );
};

export default NewRecipe;
