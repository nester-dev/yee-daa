import { type FC } from "react";
import { useFormContext } from "react-hook-form";

import type { OptionType } from "@/features/select-filters";

import { FormCounter } from "@/shared/ui/ui-counter/ui-form-counter.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";
import UiCheckboxOption from "@/shared/ui/ui-select/ui-checkbox-option.tsx";
import UiSelect from "@/shared/ui/ui-select/ui-select.tsx";
import UiTextarea from "@/shared/ui/ui-textarea/ui-textarea.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { getSubcategoryOptions } from "../../lib/get-subcategory-options.ts";
import type { PublishRecipeSchemaType } from "../../model/publish-recipe-schema.ts";

import { CustomValueContainer } from "./custom-value-container.tsx";

import styles from "./recipe-header-section.module.scss";

const RecipeMeta: FC = () => {
  const { register, formState, setValue, control } =
    useFormContext<PublishRecipeSchemaType>();

  return (
    <div className={styles.meta}>
      <div className={styles.categories}>
        <UiTypography fontWeight="semibold">
          Выберите не менее 3-х тегов
        </UiTypography>
        <div>
          <UiSelect
            placeholder="Категория"
            isMulti={true}
            options={getSubcategoryOptions()}
            closeMenuOnSelect={false}
            isSearchable={false}
            hideSelectedOptions={false}
            variant="primary"
            isClearable={false}
            components={{
              Option: UiCheckboxOption,
              ValueContainer: CustomValueContainer,
            }}
            onChange={(value) => setValue("categories", value as OptionType[])}
            error={!!formState.errors.categories}
          />
        </div>
      </div>
      <UiInput
        className={styles.input}
        placeholder="Название рецепта"
        error={!!formState.errors.title}
        {...register("title")}
      />
      <UiTextarea
        placeholder="Краткое описание рецепта"
        rows={5}
        error={!!formState.errors.description}
        {...register("description")}
      />
      <FormCounter
        className={styles.counter}
        label={
          <UiTypography fontWeight="semibold">
            На сколько человек ваш рецепт?
          </UiTypography>
        }
        control={control}
        name="portions"
      />

      <FormCounter
        className={styles.counter}
        label={
          <UiTypography fontWeight="semibold">
            Сколько времени готовить в минутах?
          </UiTypography>
        }
        control={control}
        name="time"
      />
    </div>
  );
};

export default RecipeMeta;
