import type { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";

import UiSpinner from "@/shared/ui/ui-spinner/ui-spinner.tsx";

import { selectIsSomeQueryPending } from "../store/selectors";

const SpinnerProvider: FC<PropsWithChildren> = ({ children }) => {
  const isSomeQueryPending = useSelector(selectIsSomeQueryPending);

  return (
    <>
      {children}
      {isSomeQueryPending && <UiSpinner />}
    </>
  );
};

export default SpinnerProvider;
