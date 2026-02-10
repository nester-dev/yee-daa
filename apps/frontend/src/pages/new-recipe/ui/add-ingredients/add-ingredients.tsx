import { type FC } from "react";

import { useGetMeasureUnitsQuery } from "@/entities/measure-units";

import PlusIcon from "@/shared/assets/icons/plus-outlined.svg?react";
import { useAppSelector } from "@/shared/lib/redux.ts";
import { UiTypography } from "@/shared/ui/ui-typography";

import { selectRecipeIngredients } from "../../model/selectors.ts";

import AddIngredientItem from "./add-ingredient-item.tsx";

import styles from "./add-ingredients.module.scss";

const AddIngredients: FC = () => {
  const { data } = useGetMeasureUnitsQuery();
  const ingredients = useAppSelector(selectRecipeIngredients);
  const ingredientKeys = Object.keys(ingredients);

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

        {ingredientKeys.map((key, idx) => {
          const ingredientKey = parseInt(key, 10);

          return (
            <AddIngredientItem
              key={key}
              measureUnits={data}
              ingredientKey={ingredientKey}
              ingredient={ingredients[ingredientKey]}
              showAddButton={idx === ingredientKeys.length - 1}
            />
          );
        })}
      </div>
    </section>
  );
};

export default AddIngredients;
