import { type FC } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";

import {
  type DraftRecipeSchemaType,
  type PublishRecipeSchemaType,
  RecipeButtons,
  RecipeFormVariants,
} from "@/features/recipe-form";

import { transformToRequestDto } from "@/entities/recipe";
import { useUpdateDraftRecipeMutation } from "@/entities/recipe/api/recipe-api";

type Props = {
  onVariantChange: (variant: RecipeFormVariants) => void;
  variant: RecipeFormVariants;
  recipeId: string;
};

const EditRecipeButtons: FC<Props> = ({
  onVariantChange,
  variant,
  recipeId,
}) => {
  const { handleSubmit } = useFormContext<PublishRecipeSchemaType>();
  const [updateDraft] = useUpdateDraftRecipeMutation();

  const onSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = (data) => {
    if (variant === RecipeFormVariants.DRAFT) {
      updateDraft({
        id: recipeId,
        body: transformToRequestDto(data),
      });
    } else {
      return;
    }
  };

  const handleDraft = () => {
    onVariantChange(RecipeFormVariants.DRAFT);
    handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    onVariantChange(RecipeFormVariants.NEW);
    handleSubmit(onSubmit)();
  };

  return (
    <RecipeButtons onDraftClick={handleDraft} onPublishClick={handlePublish} />
  );
};

export default EditRecipeButtons;
