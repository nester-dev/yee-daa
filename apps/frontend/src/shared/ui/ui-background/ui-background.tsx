import type { FC, PropsWithChildren } from "react";

import background from "@/shared/assets/img/yee-daa-background.jpg";

import styles from "./ui-background.module.scss";

const UiBackground: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>{children}</div>
      <img className={styles.img} src={background} alt="" />
    </div>
  );
};

export default UiBackground;
