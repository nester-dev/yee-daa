import type { FC, PropsWithChildren } from "react";

import background from "@/shared/assets/img/yee-daa-background.jpg";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./ui-background.module.scss";

const UiBackground: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>{children}</div>
      <img className={styles.img} src={background} alt="" />

      <UiTypography className={styles.text} variant="xs" fontWeight="semibold">
        Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
      </UiTypography>
    </div>
  );
};

export default UiBackground;
