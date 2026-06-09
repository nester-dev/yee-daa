import { type FC } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";

import {
  type DraftRecipeSchemaType,
  type PublishRecipeSchemaType,
  RecipeButtons,
  RecipeFormVariants,
} from "@/widgets/recipe-form";

import { UnsavedChangesGuard } from "@/features/unsaved-changes";

import {
  transformToRequestDto,
  useUpdateDraftRecipeMutation,
} from "@/entities/recipe";

type Props = {
  onVariantChange: (variant: RecipeFormVariants) => void;
  recipeId: string;
};

const EditRecipeButtons: FC<Props> = ({ onVariantChange, recipeId }) => {
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useFormContext<PublishRecipeSchemaType | DraftRecipeSchemaType>();
  const [updateDraft] = useUpdateDraftRecipeMutation();

  const onDraftSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = async (data) => {
    await updateDraft({
      id: recipeId,
      body: transformToRequestDto(data),
    }).unwrap();
  };

  const submitDraft = async () => {
    let isValid = false;

    onVariantChange(RecipeFormVariants.DRAFT);
    await handleSubmit(
      async (data) => {
        try {
          await onDraftSubmit(data);
          reset(data);
          isValid = true;
        } catch {
          isValid = false;
        }
      },
      () => {
        isValid = false;
      },
    )();

    return isValid;
  };

  const handleDraft = () => {
    void submitDraft();
  };

  const handlePublish = () => {
    onVariantChange(RecipeFormVariants.NEW);
    void handleSubmit(() => undefined)();
  };

  return (
    <>
      <RecipeButtons
        onDraftClick={handleDraft}
        onPublishClick={handlePublish}
      />
      <UnsavedChangesGuard isDirty={isDirty} onSaveDraft={submitDraft} />
    </>
  );
};

export default EditRecipeButtons;
