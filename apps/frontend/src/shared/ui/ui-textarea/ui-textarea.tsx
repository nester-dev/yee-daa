import type { FC, TextareaHTMLAttributes } from "react";

import styles from "./ui-textarea.module.scss";

const UiTextarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  return <textarea className={styles.textarea} {...props} />;
};

export default UiTextarea;
