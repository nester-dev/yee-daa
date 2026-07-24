import type { FC } from "react";
import { useLocation, useNavigate } from "react-router";

import { useGetMeQuery, UserAvatar } from "@/entities/user/index.ts";

import AvatarIcon from "@/shared/assets/icons/avatar-icon.svg?react";
import HomeIcon from "@/shared/assets/icons/home-icon.svg?react";
import NotesIcon from "@/shared/assets/icons/notes-icon.svg?react";
import SearchIcon from "@/shared/assets/icons/search-icon.svg?react";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";

import NavigationItem from "./navigation-item.tsx";

import styles from "./bottom-navigation.module.scss";

const BottomNavigation: FC = () => {
  const { data } = useGetMeQuery();
  const location = useLocation();
  const navigate = useNavigate();

  const avatar = data?.photoLink ? (
    <UserAvatar
      photo={`${import.meta.env.VITE_ASSETS_URL}/${data?.photoLink}`}
    />
  ) : (
    <AvatarIcon className={styles.avatar} />
  );

  return (
    <footer className={styles.navigation}>
      <NavigationItem
        icon={<HomeIcon />}
        isActive={location.pathname === ROUTE_PATHS.HOME}
        onClick={() => navigate(ROUTE_PATHS.HOME)}
      >
        Главная
      </NavigationItem>
      <NavigationItem icon={<SearchIcon />} onClick={() => undefined}>
        Поиск
      </NavigationItem>
      <NavigationItem
        icon={<NotesIcon />}
        isActive={location.pathname === ROUTE_PATHS.NEW_RECIPE}
        onClick={() => navigate(ROUTE_PATHS.NEW_RECIPE)}
      >
        Записать
      </NavigationItem>
      <NavigationItem
        icon={avatar}
        isActive={location.pathname === ROUTE_PATHS.PROFILE}
        onClick={() => navigate(ROUTE_PATHS.PROFILE)}
      >
        Мой профиль
      </NavigationItem>
    </footer>
  );
};

export default BottomNavigation;
