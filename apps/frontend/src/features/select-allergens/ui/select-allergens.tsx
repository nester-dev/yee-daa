import { type FC, useRef, useState } from "react";
import Select from "react-select";

import { useAppDispatch } from "@/shared/lib/hooks.ts";
import { useClickOutside } from "@/shared/lib/use-click-outside.ts";

import { allergensOptions } from "../model/data.ts";
import { setAllergens } from "../model/slice.ts";
import type { OptionType } from "../model/types.ts";

import CustomMenuList from "./custom-menu-list.tsx";
import CustomOption from "./custom-option.tsx";

import styles from "./select-allergens.module.scss";

const SelectAllergens: FC = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside<HTMLDivElement>(containerRef, () => setIsInputFocused(false));
  const dispatch = useAppDispatch();

  const handleChange = (newValue: unknown) => {
    dispatch(setAllergens(newValue as OptionType[]));
  };

  return (
    <div ref={containerRef} className={styles.select}>
      <Select
        classNamePrefix="allergens"
        options={allergensOptions}
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
          Option: CustomOption,
          MenuList: CustomMenuList,
        }}
      />
    </div>
  );
};

export default SelectAllergens;
