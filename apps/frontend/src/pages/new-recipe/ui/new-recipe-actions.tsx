import { type FC } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";

import {
  type PublishRecipeSchemaType,
  RecipeButtons,
  RecipeFormVariants,
} from "@/features/recipe-form";

type Props = {
  onVariantChange: (variant: RecipeFormVariants) => void;
};

const NewRecipeActions: FC<Props> = ({ onVariantChange }) => {
  const { handleSubmit } = useFormContext<PublishRecipeSchemaType>();

  const onSubmit: SubmitHandler<PublishRecipeSchemaType> = (data) => {
    console.log(data);
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
