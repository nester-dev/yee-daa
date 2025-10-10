import { Header } from "@/widgets/header";
import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/sidebar";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
