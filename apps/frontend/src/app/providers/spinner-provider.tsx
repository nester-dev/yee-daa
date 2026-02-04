import type { FC } from "react";
import { createPortal } from "react-dom";

import { useAppSelector } from "@/shared/lib/redux.ts";
import { usePortalRoot } from "@/shared/lib/use-portal-root.ts";
import UiSpinner from "@/shared/ui/ui-spinner/ui-spinner.tsx";

import { selectIsSomeQueryPending } from "../store/selectors";

const SpinnerProvider: FC = () => {
  const isSomeQueryPending = useAppSelector(selectIsSomeQueryPending);
  const modalRoot = usePortalRoot({
    lockScrollOnOpen: true,
    rootId: "modal-root",
  });

  return createPortal(<>{isSomeQueryPending && <UiSpinner />}</>, modalRoot);
};

export default SpinnerProvider;
