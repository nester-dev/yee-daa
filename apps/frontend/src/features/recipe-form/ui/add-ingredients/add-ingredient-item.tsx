import { type FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

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

import { EmptyIngredient } from "../../config";
import type { PublishRecipeSchemaType } from "../../model/publish-recipe-schema.ts";

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
  const { register, control, formState } =
    useFormContext<PublishRecipeSchemaType>();
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
        step={1}
        inputMode="numeric"
        color="secondary"
        variant="small"
        onKeyDown={(e) => {
          if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text").trim();
          if (!/^\d+$/.test(text)) {
            e.preventDefault();
          }
        }}
        {...register(`ingredients.${index}.count`, {
          setValueAs: (value) => {
            if (value === "" || value == null) return "";
            const onlyDigits = String(value).replace(/[^\d]/g, "");
            if (!onlyDigits) return "";
            return Number.parseInt(onlyDigits, 10);
          },
        })}
        error={!!ingredientErrors?.count}
      />

      <Controller
        control={control}
        name={`ingredients.${index}.measureUnit`}
        render={({ field }) => {
          const currentValue = field.value as Partial<OptionType> | undefined;

          return (
            <UiSelect
              {...field}
              placeholder="Единица измерения"
              options={getMeasureUnitsOptions(measureUnits)}
              variant="secondary"
              isClearable
              maxMenuHeight={150}
              value={currentValue?.value ? (currentValue as OptionType) : null}
              onChange={(value) =>
                field.onChange(
                  (value as OptionType) ?? { value: "", label: "" },
                )
              }
              error={!!ingredientErrors?.measureUnit}
            />
          );
        }}
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
