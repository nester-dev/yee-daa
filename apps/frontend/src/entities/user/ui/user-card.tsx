import type { PropsWithChildren } from "react";
import clsx from "clsx";

import { UiTypography } from "@/shared/ui/ui-typography";

import type { UserAvatarSize } from "../model/types";

import UserAvatar from "./user-avatar";

import styles from "./user-card.module.scss";

type Props = PropsWithChildren<{
  photo: string;
  firstName: string;
  lastName: string;
  login: string;
  avatarSize?: UserAvatarSize;
  variant?: "large" | "medium";
  nameSize?: "large" | "medium";
  className?: string;
  onClick?: () => void;
}>;

const UserCard = ({
  photo,
  firstName,
  lastName,
  login,
  avatarSize = "medium",
  nameSize = "medium",
  variant = "large",
  children,
  className,
  onClick,
}: Props) => {
  return (
    <div
      className={clsx(
        styles.author,
        onClick && styles["author-clickable"],
        variant === "large" && styles["author-large"],
        className,
      )}
      onClick={onClick}
    >
      <UserAvatar photo={photo} size={avatarSize} />
      <div className={styles.identity}>
        <UiTypography
          variant={nameSize === "medium" ? "lg" : "title"}
          fontWeight={nameSize === "medium" ? "medium" : "bold"}
          className={styles.name}
        >
          {firstName} {lastName}
        </UiTypography>
        <UiTypography variant="sm" color="blackOverlay">
          @{login}
        </UiTypography>
        {children}
      </div>
    </div>
  );
};

export default UserCard;
