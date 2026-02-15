import type { FC } from "react";

import { UserStats } from "@/entities/user-stats";

import CreateRecipeButton from "./create-recipe-button.tsx";

import styles from "./stats-sidebar.module.scss";

const StatsSidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <UserStats
        size="medium"
        direction="column"
        bookmarksCount={185}
        followersCount={589}
        likesCount={587}
      />
      <CreateRecipeButton />
    </aside>
  );
};

export default StatsSidebar;
