import type { FC } from "react";

import {
  ExcludeAllergens,
  SelectAllergens,
  SelectFilters,
} from "@/features/select-filters";

import UiDrawer from "@/shared/ui/ui-drawer/ui-drawer.tsx";
import UiCheckboxOption from "@/shared/ui/ui-select/ui-checkbox-option.tsx";
import UiSelect from "@/shared/ui/ui-select/ui-select.tsx";

import { getCategoryOptions } from "../lib/get-category-options.ts";

import ActionButtons from "./action-buttons.tsx";
import FilterTags from "./filter-tags.tsx";

import styles from "./filters-drawer.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const FiltersDrawer: FC<Props> = ({ onClose, isOpen }) => {
  return (
    <UiDrawer isOpen={isOpen} onClose={onClose} title="Фильтры">
      <UiSelect
        placeholder="Категория"
        isMulti={true}
        options={getCategoryOptions()}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option: UiCheckboxOption,
        }}
      />

      <UiSelect
        placeholder="Поиск по автору"
        isMulti
        closeMenuOnSelect={false}
        components={{ Option: UiCheckboxOption }}
      />
      <div className={styles.allergens}>
        <ExcludeAllergens />
        <SelectAllergens />
      </div>
      <SelectFilters />
      <FilterTags />
      <ActionButtons onFiltersApply={onClose} />
    </UiDrawer>
  );
};

export default FiltersDrawer;
