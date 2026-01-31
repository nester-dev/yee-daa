import type { FC, InputHTMLAttributes } from "react";

import styles from "./ui-checkbox.module.scss";

const UiCheckbox: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input type="checkbox" {...props} className={styles.checkbox} />;
};

export default UiCheckbox;
