import type { FC } from "react";

import "@/shared/styles/global.scss";

import AppProvider from "./providers/app-provider";
import AppRouter from "./router";

const App: FC = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
