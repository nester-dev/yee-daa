import type { ComponentProps, FC } from "react";
import Select from "react-select";

import styles from "./ui-select.module.scss";

type Props = ComponentProps<typeof Select> & {
  variant?: "primary" | "secondary";
};

const UiSelect: FC<Props> = ({ variant = "primary", ...rest }) => {
  return (
    <Select
      {...rest}
      classNamePrefix={variant}
      className={styles.select}
      noOptionsMessage={() => "Нет вариантов"}
    />
  );
};

export default UiSelect;
