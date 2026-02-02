import { Outlet } from "react-router";

import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { StatsSidebar } from "@/widgets/stats-sidebar";

import { useIsAboveLaptopDevice } from "@/shared/lib/use-media-query.ts";

import styles from "./default-layout.module.scss";

const DefaultLayout = () => {
  const isAboveLaptopDevice = useIsAboveLaptopDevice();

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        {!isAboveLaptopDevice && <Sidebar />}
        <div className={styles.content}>
          <Outlet />
        </div>
        <StatsSidebar />
      </main>
    </div>
  );
};

export default DefaultLayout;
