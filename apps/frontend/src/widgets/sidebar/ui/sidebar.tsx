import type { FC } from "react";
import { Menu } from "@/features/menu";
import styles from "./Sidebar.module.scss";
import { UiCopyright } from "@/shared/ui/ui-copyright";
import { Logout } from "@/features/logout";

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
