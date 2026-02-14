import type { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from "react";
import cn from "clsx";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./ui-input.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  error?: boolean | string;
  helperText?: string;
  suffix?: ReactElement;
  color?: "primary" | "secondary";
  variant?: "small" | "medium";
  containerClasses?: string;
};

const UiInput: FC<Props> = ({
  name,
  label,
  onChange,
  placeholder,
  helperText,
  error,
  suffix,
  className,
  color = "primary",
  variant = "medium",
  containerClasses,
  ...rest
}) => {
  return (
    <div
      className={cn(
        styles.container,
        styles[color],
        styles[variant],
        !!error && styles.error,
        containerClasses,
      )}
    >
      <div className={styles["input-group"]}>
        <label className={styles.label}>
          {label && <span>{label}</span>}
          <div className={cn(styles["input-wrapper"], className)}>
            <input
              name={name}
              onChange={onChange}
              className={styles.input}
              placeholder={placeholder}
              {...rest}
            />
            {suffix}
          </div>
          {helperText && (
            <span className={styles.helperText}>{helperText}</span>
          )}
          {typeof error === "string" && (
            <UiTypography
              className={styles["error-text"]}
              color="redPrimary"
              variant="xs"
              fontWeight="medium"
            >
              {error}
            </UiTypography>
          )}
        </label>
      </div>
    </div>
  );
};

export default UiInput;
