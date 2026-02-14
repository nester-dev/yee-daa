import type { FC, TextareaHTMLAttributes } from "react";
import cn from "clsx";

import styles from "./ui-textarea.module.scss";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

const UiTextarea: FC<Props> = ({ className, error, ...rest }) => {
  return (
    <textarea
      className={cn(styles.textarea, error && styles.error, className)}
      {...rest}
    />
  );
};

export default UiTextarea;
