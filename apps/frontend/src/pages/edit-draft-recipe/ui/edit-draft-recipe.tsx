import { useParams } from "react-router";

import { getRecipeFormDefaultValues, RecipeForm } from "@/widgets/recipe-form";

import { useGetMeQuery } from "@/entities/user";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container";

import EditRecipeButtons from "./edit-recipe-buttons";

const EditDraftRecipe = () => {
  const { recipeId } = useParams();
  const { data: me } = useGetMeQuery();

  const draft = me?.drafts?.find((item) => item._id === recipeId);

  if (!draft || !recipeId) {
    return null;
  }

  return (
    <UiContentContainer>
      <RecipeForm
        defaultValues={getRecipeFormDefaultValues(draft)}
        formActions={({ onVariantChange, variant }) => (
          <EditRecipeButtons
            onVariantChange={onVariantChange}
            variant={variant}
            recipeId={recipeId}
          />
        )}
      />
    </UiContentContainer>
  );
};

export default EditDraftRecipe;
