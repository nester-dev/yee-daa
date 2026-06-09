import { type FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { useGetMeasureUnitsQuery } from "@/entities/measure-units";

import PlusIcon from "@/shared/assets/icons/plus-outlined.svg?react";
import { UiTypography } from "@/shared/ui/ui-typography";

import AddIngredientItem from "./add-ingredient-item.tsx";

import styles from "./add-ingredients.module.scss";

const AddIngredients: FC = () => {
  const { data } = useGetMeasureUnitsQuery();

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
    keyName: "id",
  });

  return (
    <section>
      <div className={styles.title}>
        <UiTypography fontWeight="semibold">
          Добавьте ингредиенты рецепта, нажав на
        </UiTypography>
        <PlusIcon />
      </div>

      <div className={styles.grid}>
        <UiTypography variant="xs" fontWeight="bold" color="greenPrimary">
          Ингредиент
        </UiTypography>

        <UiTypography variant="xs" fontWeight="bold" color="greenPrimary">
          Количество
        </UiTypography>
        <UiTypography variant="xs" fontWeight="bold" color="greenPrimary">
          Единица измерения
        </UiTypography>
        <span />

        {fields.map((field, idx) => {
          return (
            <AddIngredientItem
              key={field.id}
              measureUnits={data}
              index={idx}
              showAddButton={idx === fields.length - 1}
              remove={remove}
              append={append}
            />
          );
        })}
      </div>
    </section>
  );
};

export default AddIngredients;
