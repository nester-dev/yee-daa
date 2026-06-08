import type {
  DraftRecipeSchemaType,
  PublishRecipeSchemaType,
} from "@/features/recipe-form";

export const transformToRequestDto = (
  data: DraftRecipeSchemaType | PublishRecipeSchemaType,
) => {
  return {
    title: data.title,
    description: data?.description || null,
    image: null,
    categoriesIds: data.categories?.map((category) => category?.value) || null,
    time: data?.time || null,
    portions: data?.portions || null,
    steps:
      data?.steps?.map((step, idx) => ({
        image: step?.image || null,
        description: step?.description || null,
        stepNumber: idx + 1,
      })) || null,
    ingredients:
      data?.ingredients?.map((ingredient) => ({
        title: ingredient?.title || null,
        count: Number(ingredient?.count) || null,
        measureUnit: ingredient?.measureUnit?.label || null,
      })) || null,
  };
};
