import type { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from "react";
import cn from "clsx";

import styles from "./ui-input.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  error?: string | null;
  helperText?: string;
  suffix?: ReactElement;
};

const UiInput: FC<Props> = ({
  name,
  value,
  label,
  onChange,
  placeholder,
  helperText,
  error,
  suffix,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <div className={styles["input-group"]}>
        <label className={styles.label}>
          {label && <span>{label}</span>}
          <div className={cn(styles["input-wrapper"], !!error && styles.error)}>
            <input
              name={name}
              value={value}
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
        </label>
      </div>
    </div>
  );
};

export default UiInput;
