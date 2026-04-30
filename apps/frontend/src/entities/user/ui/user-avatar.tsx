import cn from "clsx";

import styles from "./user-avatar.module.scss";

type Props = {
  photo: string;
  size?: "medium" | "large";
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
