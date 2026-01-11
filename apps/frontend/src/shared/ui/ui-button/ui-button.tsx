import type { FC, PropsWithChildren, ReactElement } from "react";
import cn from "clsx";

import styles from "./ui-button.module.scss";

type Props = PropsWithChildren<{
  variant?: "solid" | "outlined" | "text";
  color?: "primary" | "secondary" | "success";
  icon?: ReactElement;
  iconPosition?: "start" | "end";
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}>;

const UiButton: FC<Props> = ({
  variant = "solid",
  color = "primary",
  icon,
  iconPosition,
  onClick,
  children,
  fullWidth,
  disabled,
  className,
}) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[iconPosition === "end" ? "button-reverse" : ""],
        fullWidth && styles["full-width"],
        styles[color],
        styles[variant],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
};

export default UiButton;
