import { type FC } from "react";
import { useFormContext } from "react-hook-form";

import { EmptyIngredient } from "@/pages/new-recipe/config";

import type { OptionType } from "@/features/select-filters";

import {
  getMeasureUnitsOptions,
  type MeasureUnit,
} from "@/entities/measure-units";

import PlusIcon from "@/shared/assets/icons/plus-rounded.svg?react";
import TrashIcon from "@/shared/assets/icons/trash-icon.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";
import UiSelect from "@/shared/ui/ui-select/ui-select.tsx";

import type { NewRecipeSchemaType } from "../../model/new-recipe-schema.ts";

import styles from "./add-ingredients.module.scss";

type Props = {
  measureUnits?: MeasureUnit[];
  showAddButton: boolean;
  remove: (index: number) => void;
  append: (value: typeof EmptyIngredient) => void;
  index: number;
};

const AddIngredientItem: FC<Props> = ({
  measureUnits,
  showAddButton,
  remove,
  append,
  index,
}) => {
  const { register, setValue, formState } =
    useFormContext<NewRecipeSchemaType>();
  const ingredientErrors = formState.errors.ingredients?.[index];

  const handleAdd = () => {
    append(EmptyIngredient);
  };

  const handleRemove = () => {
    remove(index);
  };

  return (
    <>
      <UiInput
        placeholder="Ингредиент"
        containerClasses={styles.ingredient}
        color="secondary"
        variant="small"
        {...register(`ingredients.${index}.title`)}
        error={!!ingredientErrors?.title}
      />

      <UiInput
        className="ingredient-select"
        type="number"
        placeholder="Количество"
        min={1}
        color="secondary"
        variant="small"
        {...register(`ingredients.${index}.count`)}
        error={!!ingredientErrors?.count}
      />

      <UiSelect
        placeholder="Единица измерения"
        options={getMeasureUnitsOptions(measureUnits)}
        variant="secondary"
        isClearable
        maxMenuHeight={150}
        onChange={(value) =>
          setValue(`ingredients.${index}.measureUnit`, value as OptionType)
        }
        error={!!ingredientErrors?.measureUnit}
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
