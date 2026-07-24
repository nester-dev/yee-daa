import { useState } from "react";
import { useNavigate } from "react-router";
import cn from "clsx";

import { useGetMeQuery, UserCard } from "@/entities/user";
import { UserStats } from "@/entities/user-stats";

import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { useIsAboveLaptopDevice } from "@/shared/lib/use-media-query.ts";
import { UiLogo } from "@/shared/ui/ui-logo";

import Burger from "./burger.tsx";

import styles from "./Header.module.scss";

const Header = () => {
  const { data } = useGetMeQuery();
  const navigate = useNavigate();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const isAboveLaptop = useIsAboveLaptopDevice();
  const avatarUrl = `${import.meta.env.VITE_ASSETS_URL}/${data?.photoLink}`;

  const toggleBurger = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate(ROUTE_PATHS.PROFILE);
  };

  return (
    <header
      className={cn(styles.header, isBurgerOpen && styles["header-white"])}
    >
      <UiLogo />
      {!isAboveLaptop && (
        <UserCard
          variant="medium"
          photo={avatarUrl}
          firstName={data?.firstName || ""}
          lastName={data?.lastName || ""}
          login={data?.login || ""}
          className={styles.profile}
          onClick={handleProfileClick}
        />
      )}

      <div className={styles.header__right}>
        {isAboveLaptop && (
          <UserStats
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
