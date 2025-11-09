import type { FC } from "react";

import { CreateRecipe } from "@/features/create-recipe";

import { UserStats } from "@/entities/user-stats";

import styles from "./stats-sidebar.module.scss";

const StatsSidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <UserStats bookmarksCount={185} followersCount={589} likesCount={587} />
      <CreateRecipe />
    </aside>
  );
};

export default StatsSidebar;
