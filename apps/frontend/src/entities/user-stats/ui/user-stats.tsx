import { type FC } from "react";
import cn from "clsx";

import BookmarksIcon from "@/shared/assets/icons/bookmark-heart.svg?react";
import LikesIcon from "@/shared/assets/icons/emoji-heart-eyes.svg?react";
import FollowersIcon from "@/shared/assets/icons/followers.svg?react";

import type { UserStatsType } from "../model/types.ts";

import UserStatsItem from "./user-stats-item.tsx";

import styles from "./user-stats.module.scss";

type Props = UserStatsType & {
  size?: "small" | "medium" | "large";
  direction?: "row" | "column";
  className?: string;
};

const UserStats: FC<Props> = ({
  followersCount,
  likesCount,
  bookmarksCount,
  size = "medium",
  direction = "row",
  className,
}) => {
  return (
    <div
      className={cn(
        styles["user-stats"],
        styles[size],
        styles[direction],
        className,
      )}
    >
      {Number(bookmarksCount) >= 0 && (
        <UserStatsItem icon={<BookmarksIcon />} className={styles["item"]}>
          {bookmarksCount}
        </UserStatsItem>
      )}
      {Number(followersCount) >= 0 && (
        <UserStatsItem className={styles["item"]} icon={<FollowersIcon />}>
          {followersCount}
        </UserStatsItem>
      )}
      {Number(likesCount) >= 0 && (
        <UserStatsItem className={styles["item"]} icon={<LikesIcon />}>
          {likesCount}
        </UserStatsItem>
      )}
    </div>
  );
};

export default UserStats;
