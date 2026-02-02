import type { FC } from "react";

import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";

import type { BurgerProps } from "../model/types.ts";

import BurgerIcon from "./burger-icon.tsx";
import BurgerMenu from "./burger-menu.tsx";

import styles from "./header.module.scss";

const Burger: FC<BurgerProps> = ({ isOpen, onClick }) => {
  return (
    <div className={styles.burger}>
      <UiIconButton onClick={onClick}>
        <BurgerIcon isOpen={isOpen} />
      </UiIconButton>

      <BurgerMenu isOpen={isOpen} onClick={onClick} />
    </div>
  );
};

export default Burger;
