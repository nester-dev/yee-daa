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
}>;

const UserCard = ({
  photo,
  firstName,
  lastName,
  login,
  avatarSize = "medium",
  children,
}: Props) => {
  return (
    <div className={clsx(styles.author, styles["author-large"])}>
      <UserAvatar photo={photo} size={avatarSize} />
      <div className={styles.identity}>
        <UiTypography variant="lg" fontWeight="medium" className={styles.name}>
          {firstName} {lastName}fsadfasddsfasdfdsf
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
