import { type FC } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { generatePath, useNavigate } from "react-router";

import {
  type DraftRecipeSchemaType,
  type PublishRecipeSchemaType,
  RecipeButtons,
  RecipeFormVariants,
} from "@/widgets/recipe-form";

import { UnsavedChangesGuard } from "@/features/unsaved-changes";

import { CATEGORIES_DATA } from "@/entities/category";
import {
  getRecipePrimaryCategory,
  type PublishRecipeDto,
  transformToRequestDto,
  usePublishRecipeMutation,
  useUpdateDraftRecipeMutation,
} from "@/entities/recipe";

import { matchHttpError } from "@/shared/api/match-http-error";
import { showNotification } from "@/shared/lib/show-notification";

type Props = {
  onVariantChange: (variant: RecipeFormVariants) => void;
  recipeId: string;
};

const EditRecipeButtons: FC<Props> = ({ onVariantChange, recipeId }) => {
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useFormContext<PublishRecipeSchemaType | DraftRecipeSchemaType>();

  const hasUnsavedChanges = isDirty && !isSubmitting && !isSubmitSuccessful;
  const [updateDraft] = useUpdateDraftRecipeMutation();
  const [publishRecipe] = usePublishRecipeMutation();
  const navigate = useNavigate();

  const onDraftSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = async (data) => {
    await updateDraft({
      id: recipeId,
      body: transformToRequestDto(data),
    }).unwrap();
  };

  const onPublishSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = async (data) => {
    try {
      const recipe = await publishRecipe(
        transformToRequestDto(data) as unknown as PublishRecipeDto,
      ).unwrap();
      showNotification({
        title: "Рецепт успешно опубликован",
        variant: "success",
      });
      const categories = getRecipePrimaryCategory(recipe, CATEGORIES_DATA);
      if (categories) {
        navigate(
          generatePath("/:category/:subcategory/:recipeId", {
            category: categories.category,
            subcategory: categories.subCategory,
            recipeId: recipe._id,
          }),
        );
      }
    } catch (error) {
      matchHttpError(error, {
        default: () => {
          showNotification({
            title: "Ошибка сервера",
            text: "Попробуйте пока сохранить в черновик.",
            variant: "error",
          });
        },
      });
    }
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
      <UnsavedChangesGuard
        isDirty={hasUnsavedChanges}
        onSaveDraft={submitDraft}
      />
    </>
  );
};

export default EditRecipeButtons;
