import { Header } from "@/widgets/header";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;