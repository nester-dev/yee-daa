import cn from "clsx";

import type { UserAvatarSize } from "../model/types";

import styles from "./user-avatar.module.scss";

type Props = {
  photo: string;
  size?: UserAvatarSize;
  className?: string;
};

const UserAvatar = ({ photo, size = "medium", className }: Props) => {
  return (
    <img
      className={cn(styles.avatar, size && styles[size], className)}
      src={photo}
      alt="user avatar"
    />
  );
};

export default UserAvatar;
