import type { ComponentProps, FC } from "react";
import Select from "react-select";
import cn from "clsx";

import styles from "./ui-select.module.scss";

type Props = ComponentProps<typeof Select> & {
  variant?: "primary" | "secondary";
  error?: boolean;
};

const UiSelect: FC<Props> = ({ variant = "primary", error, ...rest }) => {
  return (
    <Select
      {...rest}
      classNamePrefix={variant}
      className={cn(styles.select, { "control-error": error })}
      noOptionsMessage={() => "Нет вариантов"}
    />
  );
};

export default UiSelect;
