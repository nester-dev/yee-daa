import { type FC } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";

import {
  type DraftRecipeSchemaType,
  type PublishRecipeSchemaType,
  RecipeButtons,
  RecipeFormVariants,
} from "@/widgets/recipe-form";

import {
  type PublishRecipeDto,
  transformToRequestDto,
  useCreateDraftRecipeMutation,
  usePublishRecipeMutation,
} from "@/entities/recipe";

type Props = {
  onVariantChange: (variant: RecipeFormVariants) => void;
  variant: RecipeFormVariants;
};

const NewRecipeActions: FC<Props> = ({ onVariantChange, variant }) => {
  const { handleSubmit } = useFormContext<PublishRecipeSchemaType>();
  const [createDraft] = useCreateDraftRecipeMutation();
  const [publishRecipe] = usePublishRecipeMutation();

  const onSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = (data) => {
    if (variant === RecipeFormVariants.DRAFT) {
      createDraft(transformToRequestDto(data));
    } else {
      publishRecipe(transformToRequestDto(data) as unknown as PublishRecipeDto);
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

export default NewRecipeActions;
