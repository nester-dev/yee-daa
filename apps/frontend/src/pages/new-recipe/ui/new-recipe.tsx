import { type FC, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AddIngredients,
  AddSteps,
  DraftRecipeSchema,
  type DraftRecipeSchemaType,
  PublishRecipeSchema,
  type PublishRecipeSchemaType,
  RecipeFormVariants,
  RecipeHeaderSection,
} from "@/features/recipe-form";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

import NewRecipeActions from "./new-recipe-actions.tsx";

import styles from "./new-recipe.module.scss";

const NewRecipe: FC = () => {
  const variantRef = useRef<RecipeFormVariants>(RecipeFormVariants.DRAFT);

  const handleVariantChange = (variant: RecipeFormVariants) => {
    variantRef.current = variant;
  };

  const methods = useForm<PublishRecipeSchemaType | DraftRecipeSchemaType>({
    defaultValues: {
      title: "",
      description: "",
      portions: 1,
      time: 5,
      ingredients: [
        {
          title: "",
          count: "",
          measureUnit: {},
        },
      ],
      categories: [],
      steps: [
        {
          image: "",
          description: "",
        },
      ],
    },
    resolver: async (data, context, options) => {
      const schema =
        variantRef.current === RecipeFormVariants.DRAFT
          ? DraftRecipeSchema
          : PublishRecipeSchema;

      return zodResolver(schema)(data, context, options);
    },
  });

  return (
    <UiContentContainer>
      <FormProvider {...methods}>
        <RecipeHeaderSection />
        <div className={styles.section}>
          <AddIngredients />
          <AddSteps />
          <NewRecipeActions onVariantChange={handleVariantChange} />
        </div>
      </FormProvider>
    </UiContentContainer>
  );
};

export default NewRecipe;
