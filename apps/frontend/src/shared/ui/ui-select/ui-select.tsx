import type { ComponentProps, FC } from "react";
import Select from "react-select";

import styles from "./ui-select.module.scss";

type Props = ComponentProps<typeof Select>;

const UiSelect: FC<Props> = (props) => {
  return (
    <Select
      {...props}
      classNamePrefix="select"
      className={styles.select}
      noOptionsMessage={() => "Нет вариантов"}
    />
  );
};

export default UiSelect;
