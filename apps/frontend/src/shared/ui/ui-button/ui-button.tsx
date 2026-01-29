import { type FC, type PropsWithChildren, type ReactElement } from "react";
import cn from "clsx";

import styles from "./ui-button.module.scss";

type Props = PropsWithChildren<{
  variant?: "solid" | "outlined" | "text";
  color?: "primary" | "secondary" | "success";
  size?: "sm" | "md";
  icon?: ReactElement;
  iconPosition?: "start" | "end";
  onClick?: (e: React.MouseEvent) => void;
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
  size = "md",
}) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[iconPosition === "end" ? "button-reverse" : ""],
        styles[size],
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
