import { type FC } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";

import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import type { NewRecipeSchemaType } from "../../model/new-recipe-schema.ts";

import styles from "./new-recipe-actions.module.scss";

const NewRecipeActions: FC = () => {
  const { handleSubmit } = useFormContext<NewRecipeSchemaType>();

  const onSubmit: SubmitHandler<NewRecipeSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.actions}>
      <UiButton>
        <UiTypography variant="lg" fontWeight="semibold">
          Сохранить черновик
        </UiTypography>
      </UiButton>
      <UiButton color="secondary" onClick={handleSubmit(onSubmit)}>
        <UiTypography variant="lg" fontWeight="semibold" color="white">
          Опубликовать рецепт
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default NewRecipeActions;
