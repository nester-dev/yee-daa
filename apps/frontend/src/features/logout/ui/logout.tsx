import { useNavigate } from "react-router";

import LogoutIcon from "@/shared/assets/icons/logout.svg?react";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { removeAccessToken, removeRefreshToken } from "@/shared/lib/cookies.ts";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./Logout.module.scss";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();
    navigate(ROUTE_PATHS.SIGN_IN, { replace: true });
  };

  return (
    <button onClick={handleLogout} className={styles.logout}>
      <LogoutIcon />
      <UiTypography variant="xs" fontWeight="bold">
        Выйти
      </UiTypography>
    </button>
  );
};

export default Logout;
