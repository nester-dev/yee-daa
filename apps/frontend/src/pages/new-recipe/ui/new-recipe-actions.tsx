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
  type PublishRecipeDto,
  transformToRequestDto,
  useCreateDraftRecipeMutation,
  usePublishRecipeMutation,
} from "@/entities/recipe";

type Props = {
  onVariantChange: (variant: RecipeFormVariants) => void;
};

const NewRecipeActions: FC<Props> = ({ onVariantChange }) => {
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useFormContext<PublishRecipeSchemaType | DraftRecipeSchemaType>();
  const [createDraft] = useCreateDraftRecipeMutation();
  const [publishRecipe] = usePublishRecipeMutation();

  const onDraftSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = async (data) => {
    await createDraft(transformToRequestDto(data)).unwrap();
  };

  const onPublishSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = async (data) => {
    await publishRecipe(
      transformToRequestDto(data) as unknown as PublishRecipeDto,
    ).unwrap();
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
    void handleSubmit(onPublishSubmit)();
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

export default NewRecipeActions;
