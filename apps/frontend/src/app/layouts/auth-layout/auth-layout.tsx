import { type FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import Logo from "@/shared/assets/icons/logo.svg?react";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { UiBackground } from "@/shared/ui/ui-background";
import UiTabs from "@/shared/ui/ui-tabs/ui-tabs.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./auth-layout.module.scss";

const AuthLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <UiBackground>
      <main className={styles.content}>
        <Logo className={styles.img} />
        <UiTabs
          activeTab={location.pathname}
          initValue={location.pathname}
          onSelect={(value) => navigate(value.toString())}
          items={[
            {
              title: "Вход на сайт",
              value: ROUTE_PATHS.SIGN_IN,
            },
            {
              title: "Регистрация",
              value: ROUTE_PATHS.SIGN_UP,
            },
          ]}
        />
        <div className={styles.form}>
          <Outlet />
        </div>

        <UiTypography
          variant="xs"
          fontWeight="semibold"
          className={styles.text}
        >
          Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
        </UiTypography>
      </main>
    </UiBackground>
  );
};

export default AuthLayout;
