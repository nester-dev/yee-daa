import { type FC } from "react";

import { RecipeForm } from "@/widgets/recipe-form";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

import NewRecipeActions from "./new-recipe-actions.tsx";

const NewRecipe: FC = () => {
  return (
    <UiContentContainer>
      <RecipeForm
        formActions={({ onVariantChange }) => (
          <NewRecipeActions onVariantChange={onVariantChange} />
        )}
      />
    </UiContentContainer>
  );
};

export default NewRecipe;
