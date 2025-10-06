import styles from './Header.module.scss';
import { UiLogo } from "@/shared/ui/ui-logo";

const Header = () => {
  return (
    <header className={styles.header}>
      <UiLogo />
    </header>
  );
};

export default Header;