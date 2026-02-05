import { type FC, useState } from "react";

import UiCounter from "@/shared/ui/ui-counter/ui-counter.tsx";
import { useCounter } from "@/shared/ui/ui-counter/useCounter.ts";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";
import UiCheckboxOption from "@/shared/ui/ui-select/ui-checkbox-option.tsx";
import UiSelect from "@/shared/ui/ui-select/ui-select.tsx";
import UiTextarea from "@/shared/ui/ui-textarea/ui-textarea.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { getSubcategoryOptions } from "../../lib/get-subcategory-options.ts";
import { CustomValueContainer } from "../recipe-header-section/custom-value-container.tsx";

import styles from "./recipe-header-section.module.scss";

const RecipeMeta: FC = () => {
  const [name, setName] = useState("");
  const {
    count: personsCount,
    handleIncrement,
    handleDecrement,
  } = useCounter({
    initialValue: 1,
  });
  const {
    count: timeCount,
    handleIncrement: handleIncrementTime,
    handleDecrement: handleDecrementTime,
  } = useCounter({
    initialValue: 5,
  });

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
            components={{
              Option: UiCheckboxOption,
              ValueContainer: CustomValueContainer,
            }}
          />
        </div>
      </div>
      <UiInput
        className={styles.input}
        name="recipe-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название рецепта"
      />
      <UiTextarea placeholder="Краткое описание рецепта" rows={5} />
      <UiCounter
        className={styles.counter}
        label={
          <UiTypography fontWeight="semibold">
            На сколько человек ваш рецепт?
          </UiTypography>
        }
        value={personsCount}
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
        value={timeCount}
        increment={handleIncrementTime}
        decrement={handleDecrementTime}
      />
    </div>
  );
};

export default RecipeMeta;
