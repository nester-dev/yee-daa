import { useEffect, useMemo } from "react";

import { lockScroll } from "@/shared/lib/lock-scroll.ts";

type Params = {
  isOpen: boolean;
  rootId?: string;
  lockScrollOnOpen?: boolean;
};

export function usePortalRoot({
  isOpen,
  rootId = "portal-root",
  lockScrollOnOpen = true,
}: Params) {
  const root = useMemo(
    () => document.getElementById(rootId) || document.body,
    [rootId],
  );

  useEffect(() => {
    if (!lockScrollOnOpen) return;

    if (isOpen) {
      lockScroll(true);
    }

    return () => {
      lockScroll(false);
    };
  }, [isOpen, lockScrollOnOpen]);

  return root;
}
