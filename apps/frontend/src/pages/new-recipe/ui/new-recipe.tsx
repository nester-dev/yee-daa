import { type FC } from "react";

import { RecipeForm } from "@/features/recipe-form";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

import NewRecipeActions from "./new-recipe-actions.tsx";

const NewRecipe: FC = () => {
  return (
    <UiContentContainer>
      <RecipeForm
        formActions={({ onVariantChange, variant }) => (
          <NewRecipeActions
            onVariantChange={onVariantChange}
            variant={variant}
          />
        )}
      />
    </UiContentContainer>
  );
};

export default NewRecipe;
