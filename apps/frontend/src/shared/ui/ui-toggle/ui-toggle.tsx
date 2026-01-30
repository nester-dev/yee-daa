import type { FC } from "react";
import cn from "clsx";

import styles from "./ui-toggle.module.scss";

type Props = {
  toggled?: boolean;
  onToggle: () => void;
};

const UiToggle: FC<Props> = ({ onToggle, toggled }) => {
  return (
    <button
      className={cn(styles.toggle, toggled && styles.toggled)}
      onClick={onToggle}
    >
      <div className={styles.thumb} />
    </button>
  );
};

export default UiToggle;
