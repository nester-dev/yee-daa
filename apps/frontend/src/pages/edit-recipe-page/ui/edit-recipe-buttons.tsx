import { type FC } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { generatePath, useNavigate, useParams } from "react-router";

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
  useUpdateRecipeMutation,
} from "@/entities/recipe";

import { HttpStatus } from "@/shared/api/http-status";
import { matchHttpError } from "@/shared/api/match-http-error";
import { ROUTE_PATHS } from "@/shared/config/route-paths";
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
  const [createDraft] = useCreateDraftRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const navigate = useNavigate();
  const { category, subcategory } = useParams();

  const onDraftSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = async (data) => {
    try {
      await createDraft(transformToRequestDto(data)).unwrap();
      showNotification({
        title: "Черновик успешно сохранен",
        variant: "success",
      });
      navigate(ROUTE_PATHS.HOME);
    } catch (error) {
      matchHttpError(error, {
        [HttpStatus.CONFLICT]: () => {
          showNotification({
            title: "Ошибка",
            text: "Рецепт с таким названием уже существует.",
            variant: "error",
          });
        },
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

  const onPublishSubmit: SubmitHandler<
    PublishRecipeSchemaType | DraftRecipeSchemaType
  > = async (data) => {
    await updateRecipe({
      id: recipeId,
      body: transformToRequestDto(data) as unknown as PublishRecipeDto,
    }).unwrap();

    if (category && subcategory) {
      navigate(
        generatePath("/:category/:subcategory/:recipeId", {
          category: category,
          subcategory: subcategory,
          recipeId: recipeId,
        }),
      );
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
