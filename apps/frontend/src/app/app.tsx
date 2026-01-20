import type { FC } from "react";
import { ToastContainer } from "react-toastify";

import "@/shared/styles/global.scss";

import AppProvider from "./providers/app-provider";
import SpinnerProvider from "./providers/spinner-provider";
import AppRouter from "./router";

const App: FC = () => {
  return (
    <AppProvider>
      <SpinnerProvider />
      <AppRouter />
      <ToastContainer
        position="bottom-center"
        icon={false}
        closeButton={false}
        hideProgressBar={true}
      />
    </AppProvider>
  );
};

export default App;
