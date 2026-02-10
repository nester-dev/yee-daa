import type { FC, TextareaHTMLAttributes } from "react";
import cn from "clsx";

import styles from "./ui-textarea.module.scss";

const UiTextarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...rest
}) => {
  return <textarea className={cn(styles.textarea, className)} {...rest} />;
};

export default UiTextarea;
