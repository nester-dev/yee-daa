import type { FC } from "react";

import styles from "./ui-progress-bar.module.scss";

type Props = {
  title?: string;
  progress: number;
};

const UiProgressBar: FC<Props> = ({ title, progress }) => {
  return (
    <div>
      {title && <span className={styles.title}>{title}</span>}
      <div className={styles["progress-container"]}>
        <div
          className={styles["progress-line"]}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default UiProgressBar;
