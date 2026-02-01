import { type FC, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks.ts";
import { useClickOutside } from "@/shared/lib/use-click-outside.ts";
import UiCheckboxOption from "@/shared/ui/ui-select/ui-checkbox-option.tsx";
import UiSelect from "@/shared/ui/ui-select/ui-select.tsx";

import { allergensOptions } from "../config/data.ts";
import { selectAllergens } from "../model/selectors.ts";
import { setAllergens } from "../model/slice.ts";
import type { OptionType } from "../model/types.ts";

import CustomMenuList from "./custom-menu-list.tsx";

import styles from "./select-allergens.module.scss";

const SelectAllergens: FC = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const allergens = useAppSelector(selectAllergens);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside<HTMLDivElement>(containerRef, () => setIsInputFocused(false));
  const dispatch = useAppDispatch();

  const handleChange = (newValue: unknown) => {
    dispatch(setAllergens(newValue as OptionType[]));
  };

  return (
    <div ref={containerRef} className={styles.select}>
      <UiSelect
        options={allergensOptions}
        value={allergens}
        closeMenuOnSelect={false}
        isMulti={true}
        onChange={handleChange}
        placeholder="Выберите из списка..."
        hideSelectedOptions={false}
        isSearchable={false}
        onFocus={() => setIsInputFocused(true)}
        {...{
          menuIsOpen: isInputFocused || undefined,
        }}
        components={{
          Option: UiCheckboxOption,
          MenuList: CustomMenuList,
        }}
      />
    </div>
  );
};

export default SelectAllergens;
