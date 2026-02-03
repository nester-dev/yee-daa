import type { FC, PropsWithChildren } from "react";

import styles from "./ui-content-container.module.scss";

const UiContentContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default UiContentContainer;
