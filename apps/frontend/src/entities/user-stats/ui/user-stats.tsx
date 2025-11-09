import type { FC } from "react";

import BookmarksIcon from "@/shared/assets/icons/bookmark-heart.svg?react";
import LikesIcon from "@/shared/assets/icons/emoji-heart-eyes.svg?react";
import FollowersIcon from "@/shared/assets/icons/followers.svg?react";

import type { UserStatsType } from "../model/types.ts";

import UserStatsItem from "./user-stats-item.tsx";

import styles from "./user-stats.module.scss";

const UserStats: FC<UserStatsType> = ({
  followersCount,
  likesCount,
  bookmarksCount,
}) => {
  return (
    <div className={styles["user-stats"]}>
      <UserStatsItem
        icon={<BookmarksIcon />}
        className={styles["user-stats-item"]}
      >
        {bookmarksCount}
      </UserStatsItem>
      <UserStatsItem
        className={styles["user-stats-item"]}
        icon={<FollowersIcon />}
      >
        {followersCount}
      </UserStatsItem>
      <UserStatsItem className={styles["user-stats-item"]} icon={<LikesIcon />}>
        {likesCount}
      </UserStatsItem>
    </div>
  );
};

export default UserStats;
