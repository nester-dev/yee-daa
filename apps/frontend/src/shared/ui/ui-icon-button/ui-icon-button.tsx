import type { FC, PropsWithChildren } from "react";
import cn from "clsx";

import styles from "./ui-icon-button.module.scss";

type Props = PropsWithChildren<{
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "ghost";
}>;

const UiIconButton: FC<Props> = ({
  children,
  size = "md",
  onClick,
  className,
  variant = "ghost",
}) => {
  return (
    <button
      className={cn(styles.button, styles[size], styles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default UiIconButton;
