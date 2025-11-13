import type { FC } from "react";
import { Outlet } from "react-router";

import Logo from "@/shared/assets/icons/logo.svg?react";
import { UiBackground } from "@/shared/ui/ui-background";

import styles from "./auth-layout.module.scss";

const AuthLayout: FC = () => {
  return (
    <UiBackground>
      <main className={styles.content}>
        <Logo className={styles.img} />
        <Outlet />
      </main>
    </UiBackground>
  );
};

export default AuthLayout;
