import { type FC, type ReactNode, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DraftRecipeSchema,
  type DraftRecipeSchemaType,
  PublishRecipeSchema,
  type PublishRecipeSchemaType,
} from "../../model/publish-recipe-schema";
import { RecipeFormVariants } from "../../model/types";
import AddIngredients from "../add-ingredients/add-ingredients";
import AddSteps from "../add-steps/add-steps";
import RecipeHeaderSection from "../recipe-header-section/recipe-header-section";

import styles from "./recipe-form.module.scss";

type FormActionsRenderProps = {
  onVariantChange: (variant: RecipeFormVariants) => void;
  variant: RecipeFormVariants;
};

type TProps = {
  formActions: (props: FormActionsRenderProps) => ReactNode;
  defaultValues?: Partial<PublishRecipeSchemaType | DraftRecipeSchemaType>;
};

const RecipeForm: FC<TProps> = ({ formActions, defaultValues }) => {
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
      ...defaultValues,
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
    <FormProvider {...methods}>
      <RecipeHeaderSection />
      <div className={styles.section}>
        <AddIngredients />
        <AddSteps />
        {formActions({
          onVariantChange: handleVariantChange,
          variant: variantRef.current,
        })}
      </div>
    </FormProvider>
  );
};

export default RecipeForm;
