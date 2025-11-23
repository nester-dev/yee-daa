import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./ui-copyright.module.scss";

const UiCopyright = () => {
  return (
    <UiTypography variant="xs" className={styles.text}>
      {"Все права защищены,\nученический файл,\n©Клевер Технолоджи, 2025"}
    </UiTypography>
  );
};

export default UiCopyright;
