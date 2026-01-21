import { Link } from "react-router";

import LogoutIcon from "@/shared/assets/icons/logout.svg?react";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./Logout.module.scss";

const Logout = () => {
  return (
    <Link to="/" className={styles.logout}>
      <LogoutIcon />
      <UiTypography variant="xs" fontWeight="bold">
        Выйти
      </UiTypography>
    </Link>
  );
};

export default Logout;
