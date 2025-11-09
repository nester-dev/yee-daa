import { UiLogo } from "@/shared/ui/ui-logo";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <UiLogo />
    </header>
  );
};

export default Header;
