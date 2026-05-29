import type { PropsWithChildren } from "react";
import cn from "clsx";

import styles from "./ui-list-count.module.scss";

type TProps = PropsWithChildren<{
  count: number;
  size?: "large" | "medium";
  className?: string;
}>;

const UiListCount = ({
  count,
  children,
  size = "large",
  className,
}: TProps) => {
  return (
    <div className={cn(styles.list, styles[size], className)}>
      <span className={styles["list-text"]}>{children}</span>
      <span className={styles["list-count"]}>({count})</span>
    </div>
  );
};

export default UiListCount;
