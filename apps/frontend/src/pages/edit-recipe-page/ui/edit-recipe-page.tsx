import { useParams } from "react-router";

import { getRecipeFormDefaultValues, RecipeForm } from "@/widgets/recipe-form";

import { useGetRecipeByIdQuery } from "@/entities/recipe";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container";

import EditRecipeButtons from "./edit-recipe-buttons";

const EditRecipePage = () => {
  const { recipeId } = useParams();

  const { data } = useGetRecipeByIdQuery(recipeId!, { skip: !recipeId });

  if (!data || !recipeId) {
    return null;
  }

  return (
    <UiContentContainer>
      <RecipeForm
        defaultValues={getRecipeFormDefaultValues(data)}
        formActions={({ onVariantChange }) => (
          <EditRecipeButtons
            onVariantChange={onVariantChange}
            recipeId={recipeId}
          />
        )}
      />
    </UiContentContainer>
  );
};

export default EditRecipePage;
