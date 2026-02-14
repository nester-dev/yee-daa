import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

import {
  NewRecipeSchema,
  type NewRecipeSchemaType,
} from "../model/new-recipe-schema.ts";

import AddIngredients from "./add-ingredients/add-ingredients.tsx";
import AddSteps from "./add-steps/add-steps.tsx";
import NewRecipeActions from "./new-recipe-actions/new-recipe-actions.tsx";
import RecipeHeaderSection from "./recipe-header-section/recipe-header-section.tsx";

import styles from "./new-recipe.module.scss";

const NewRecipe: FC = () => {
  const methods = useForm<NewRecipeSchemaType>({
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
    resolver: zodResolver(NewRecipeSchema),
  });

  return (
    <UiContentContainer>
      <FormProvider {...methods}>
        <RecipeHeaderSection />
        <div className={styles.section}>
          <AddIngredients />
          <AddSteps />
          <NewRecipeActions />
        </div>
      </FormProvider>
    </UiContentContainer>
  );
};

export default NewRecipe;
