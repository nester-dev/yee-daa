import { Outlet } from "react-router";

import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { StatsSidebar } from "@/widgets/stats-sidebar";

import styles from "./default-layout.module.scss";

const DefaultLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
        <StatsSidebar />
      </main>
    </div>
  );
};

export default DefaultLayout;
