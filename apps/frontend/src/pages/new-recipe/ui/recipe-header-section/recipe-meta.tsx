import { type FC } from "react";

import UiCounter from "@/shared/ui/ui-counter/ui-counter.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";
import UiCheckboxOption from "@/shared/ui/ui-select/ui-checkbox-option.tsx";
import UiSelect from "@/shared/ui/ui-select/ui-select.tsx";
import UiTextarea from "@/shared/ui/ui-textarea/ui-textarea.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { getSubcategoryOptions } from "../../lib/get-subcategory-options.ts";
import { useRecipeMeta } from "../../lib/use-recipe-meta.ts";
import { CustomValueContainer } from "../recipe-header-section/custom-value-container.tsx";

import styles from "./recipe-header-section.module.scss";

const RecipeMeta: FC = () => {
  const {
    title,
    description,
    time,
    portions,
    categoriesOptions,
    handleChangeCategories,
    handleTitleChange,
    handleDescriptionChange,
    handleIncrement,
    handleIncrementTime,
    handleDecrementTime,
    handleDecrement,
  } = useRecipeMeta();

  return (
    <div className={styles.meta}>
      <div className={styles.categories}>
        <UiTypography fontWeight="semibold">
          Выберите не менее 3-х тегов
        </UiTypography>
        <div>
          <UiSelect
            value={categoriesOptions}
            onChange={handleChangeCategories}
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
          />
        </div>
      </div>
      <UiInput
        className={styles.input}
        name="recipe-title"
        value={title}
        onChange={handleTitleChange}
        placeholder="Название рецепта"
      />
      <UiTextarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Краткое описание рецепта"
        rows={5}
      />
      <UiCounter
        className={styles.counter}
        label={
          <UiTypography fontWeight="semibold">
            На сколько человек ваш рецепт?
          </UiTypography>
        }
        value={portions}
        increment={handleIncrement}
        decrement={handleDecrement}
      />

      <UiCounter
        className={styles.counter}
        label={
          <UiTypography fontWeight="semibold">
            Сколько времени готовить в минутах?{" "}
          </UiTypography>
        }
        value={time}
        increment={handleIncrementTime}
        decrement={handleDecrementTime}
      />
    </div>
  );
};

export default RecipeMeta;
