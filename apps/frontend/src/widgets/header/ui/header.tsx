import { useState } from "react";
import cn from "clsx";

import { UiLogo } from "@/shared/ui/ui-logo";

import Burger from "./burger.tsx";

import styles from "./Header.module.scss";

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurger = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  return (
    <header
      className={cn(styles.header, isBurgerOpen && styles["header-white"])}
    >
      <UiLogo />

      <Burger isOpen={isBurgerOpen} onClick={toggleBurger} />
    </header>
  );
};

export default Header;
