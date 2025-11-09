import type { FC } from "react";

import { Logout } from "@/features/logout";
import { Menu } from "@/features/menu";

import { UiCopyright } from "@/shared/ui/ui-copyright";

import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <Menu />

      <div className={styles["sidebar-bottom"]}>
        <UiCopyright />
        <Logout />
      </div>
    </aside>
  );
};

export default Sidebar;
