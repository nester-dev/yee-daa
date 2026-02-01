import { type FC, useState } from "react";
import { components, type MenuListProps } from "react-select";

import PlusIcon from "@/shared/assets/icons/plus-rounded.svg?react";
import useKeyPress from "@/shared/lib/use-key-press.ts";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";

import styles from "./select-allergens.module.scss";

const CustomMenuList: FC<MenuListProps> = (props) => {
  const [customValue, setCustomValue] = useState("");

  const handleAllergenAdd = () => {
    const value = customValue.trim();

    if (!value) {
      return;
    }

    props.selectOption({
      label: value,
      value,
    });

    setCustomValue("");
  };
  useKeyPress({ targetKey: "Enter", callback: handleAllergenAdd });

  return (
    <components.MenuList {...props}>
      {props.children}

      <div className={styles.search}>
        <UiInput
          name="custom-allergen"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          placeholder="Другой аллерген"
          onFocus={props.selectProps.onFocus}
        />
        <UiIconButton size="xs" onClick={handleAllergenAdd}>
          <PlusIcon />
        </UiIconButton>
      </div>
    </components.MenuList>
  );
};

export default CustomMenuList;
