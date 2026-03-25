import { type FC } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";

import {
  type DraftRecipeSchemaType,
  type PublishRecipeSchemaType,
  RecipeButtons,
  RecipeFormVariants,
} from "@/features/recipe-form";

import {
  transformToRequestDto,
  useCreateDraftRecipeMutation,
} from "@/entities/recipe";

type Props = {
  onVariantChange: (variant: RecipeFormVariants) => void;
};

const NewRecipeActions: FC<Props> = ({ onVariantChange }) => {
  const { handleSubmit } = useFormContext<PublishRecipeSchemaType>();
  const [createDraft] = useCreateDraftRecipeMutation();

  const onSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = (data) => {
    createDraft(transformToRequestDto(data));
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

export default NewRecipeActions;
