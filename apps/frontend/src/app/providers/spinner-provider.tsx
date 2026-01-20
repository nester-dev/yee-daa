import type { FC } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

import { usePortalRoot } from "@/shared/lib/usePortalRoot.ts";
import UiSpinner from "@/shared/ui/ui-spinner/ui-spinner.tsx";

import { selectIsSomeQueryPending } from "../store/selectors";

const SpinnerProvider: FC = () => {
  const isSomeQueryPending = useSelector(selectIsSomeQueryPending);
  const modalRoot = usePortalRoot({
    isOpen: isSomeQueryPending,
    lockScrollOnOpen: true,
    rootId: "modal-root",
  });

  return createPortal(<>{isSomeQueryPending && <UiSpinner />}</>, modalRoot);
};

export default SpinnerProvider;
