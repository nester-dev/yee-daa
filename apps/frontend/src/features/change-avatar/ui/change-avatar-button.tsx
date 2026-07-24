import { type FC, useState } from "react";
import cn from "clsx";

import { UserAvatar } from "@/entities/user";

import avatarPlaceholder from "@/shared/assets/icons/avatar-placeholder.png";
import UiButton from "@/shared/ui/ui-button/ui-button";

import ChangeAvatarModal from "./change-avatar-modal";

import styles from "./change-avatar.module.scss";

type TProps = {
  avatar: string;
  className?: string;
};

const ChangeAvatarButton: FC<TProps> = ({ avatar, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const avatarUrl = `${import.meta.env.VITE_ASSETS_URL}/${avatar}`;

  return (
    <>
      <UiButton
        variant="text"
        className={cn(styles.button, className)}
        onClick={() => setIsOpen(true)}
      >
        <UserAvatar size="large" photo={avatarUrl} />
        <img
          src={avatarPlaceholder}
          alt="avatar-placeholder"
          className={styles.icon}
        />
      </UiButton>
      <ChangeAvatarModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChangeAvatarButton;
