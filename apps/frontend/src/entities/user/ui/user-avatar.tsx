import { useState } from "react";
import cn from "clsx";

import AvatarIcon from "@/shared/assets/icons/avatar-icon.svg?react";

import type { UserAvatarSize } from "../model/types";

import styles from "./user-avatar.module.scss";

type Props = {
  photo: string;
  size?: UserAvatarSize;
  className?: string;
};

const UserAvatar = ({ photo, size = "medium", className }: Props) => {
  const [isImageUrlValid, setIsImageUrlValid] = useState<boolean | null>(null);

  return (
    <>
      <img
        className={cn(
          styles.avatar,
          size && styles[size],
          !isImageUrlValid && styles.hide,
          className,
        )}
        src={photo}
        alt="user avatar"
        onLoad={() => setIsImageUrlValid(true)}
        onError={() => setIsImageUrlValid(false)}
      />
      {!isImageUrlValid && <AvatarIcon className={cn(size && styles[size])} />}
    </>
  );
};

export default UserAvatar;
