import { Header } from "@/widgets/header";
import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/sidebar";
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
      </main>
    </div>
  );
};

export default DefaultLayout;
