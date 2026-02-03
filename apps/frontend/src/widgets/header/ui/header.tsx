import { useState } from "react";
import cn from "clsx";

import { UserStats } from "@/entities/user-stats";

import { useIsAboveLaptopDevice } from "@/shared/lib/use-media-query.ts";
import { UiLogo } from "@/shared/ui/ui-logo";

import Burger from "./burger.tsx";

import styles from "./Header.module.scss";

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const isAboveLaptop = useIsAboveLaptopDevice();

  const toggleBurger = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  return (
    <header
      className={cn(styles.header, isBurgerOpen && styles["header-white"])}
    >
      <UiLogo />

      <div className={styles.header__right}>
        {isAboveLaptop && (
          <UserStats
            size="small"
            direction="row"
            bookmarksCount={185}
            followersCount={589}
            likesCount={587}
          />
        )}
        <Burger isOpen={isBurgerOpen} onClick={toggleBurger} />
      </div>
    </header>
  );
};

export default Header;
