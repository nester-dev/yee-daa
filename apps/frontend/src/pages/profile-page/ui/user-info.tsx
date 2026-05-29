import { type User, UserCard } from "@/entities/user";
import { UserStats } from "@/entities/user-stats";

import SettingsIcon from "@/shared/assets/icons/settings-icon.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button";

import styles from "./profile-page.module.scss";

type TProps = User & {
  totalBookmarks: number;
  totalSubscribers: number;
};

const UserInfo = ({
  firstName,
  lastName,
  login,
  photoLink,
  totalBookmarks,
  totalSubscribers,
}: TProps) => {
  return (
    <div className={styles.info}>
      <UserCard
        firstName={firstName}
        lastName={lastName}
        login={login}
        photo={photoLink || ""}
        avatarSize="large"
        nameSize="large"
      >
        <UserStats
          size="small"
          direction="row"
          bookmarksCount={totalBookmarks}
          followersCount={totalSubscribers}
        />
      </UserCard>

      <UiIconButton>
        <SettingsIcon />
      </UiIconButton>
    </div>
  );
};

export default UserInfo;
