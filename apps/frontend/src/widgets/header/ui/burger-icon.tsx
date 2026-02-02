import type { FC } from "react";
import cn from "clsx";

import type { BurgerProps } from "../model/types";

import styles from "./header.module.scss";

const BurgerIcon: FC<Pick<BurgerProps, "isOpen">> = ({ isOpen }) => {
  return (
    <div className={cn(styles["burger-icon"], isOpen && styles.open)}>
      <span />
      <span />
      <span />
    </div>
  );
};

export default BurgerIcon;
