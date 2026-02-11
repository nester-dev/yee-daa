import { type FC } from "react";

import { EmptyIngredient } from "@/pages/new-recipe/config";

import type { OptionType } from "@/features/select-filters";

import {
  getMeasureUnitsOptions,
  type MeasureUnit,
} from "@/entities/measure-units";

import PlusIcon from "@/shared/assets/icons/plus-rounded.svg?react";
import TrashIcon from "@/shared/assets/icons/trash-icon.svg?react";
import { useAppDispatch } from "@/shared/lib/redux.ts";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";
import UiSelect from "@/shared/ui/ui-select/ui-select.tsx";

import {
  removeRecipeIngredient,
  setRecipeIngredient,
} from "../../model/slice.ts";
import type { IngredientType } from "../../model/types.ts";

import styles from "./add-ingredients.module.scss";

type Props = {
  ingredientKey: number;
  ingredient: IngredientType;
  measureUnits?: MeasureUnit[];
  showAddButton: boolean;
};

const AddIngredientItem: FC<Props> = ({
  ingredientKey,
  ingredient,
  measureUnits,
  showAddButton,
}) => {
  const dispatch = useAppDispatch();

  if (!ingredient) {
    return null;
  }

  const handleChange = (ingredient: IngredientType) => {
    dispatch(
      setRecipeIngredient({
        key: ingredientKey,
        ingredient,
      }),
    );
  };

  const handleAdd = () => {
    dispatch(
      setRecipeIngredient({
        key: ingredientKey + 1,
        ingredient: EmptyIngredient,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(removeRecipeIngredient(ingredientKey));
  };

  return (
    <>
      <UiInput
        name="ingredient"
        value={ingredient.title}
        placeholder="Ингредиент"
        containerClasses={styles.ingredient}
        color="secondary"
        variant="small"
        onChange={(e) =>
          handleChange({
            ...ingredient,
            title: e.target.value,
          })
        }
      />

      <UiInput
        className="ingredient-select"
        name="ingredient"
        type="number"
        placeholder="Количество"
        value={ingredient.count}
        min={1}
        color="secondary"
        variant="small"
        onChange={(e) =>
          handleChange({
            ...ingredient,
            count: e.target.value,
          })
        }
      />

      <UiSelect
        value={ingredient.measureUnit}
        placeholder="Единица измерения"
        options={getMeasureUnitsOptions(measureUnits)}
        variant="secondary"
        isClearable
        maxMenuHeight={150}
        onChange={(newValue) =>
          handleChange({
            ...ingredient,
            measureUnit: newValue as OptionType,
          })
        }
      />

      {showAddButton ? (
        <UiIconButton
          size="inherit"
          variant="ghost"
          className={styles.add}
          onClick={handleAdd}
        >
          <PlusIcon />
        </UiIconButton>
      ) : (
        <UiIconButton
          size="inherit"
          variant="ghost"
          className={styles.remove}
          onClick={handleRemove}
        >
          <TrashIcon />
        </UiIconButton>
      )}
    </>
  );
};

export default AddIngredientItem;
