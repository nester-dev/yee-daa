import { useEffect, useMemo } from "react";

import { lockScroll } from "@/shared/lib/lock-scroll.ts";

type Params = {
  rootId?: string;
  lockScrollOnOpen?: boolean;
};

export const usePortalRoot = ({
  rootId = "portal-root",
  lockScrollOnOpen = true,
}: Params) => {
  const root = useMemo(
    () => document.getElementById(rootId) || document.body,
    [rootId],
  );

  useEffect(() => {
    if (!lockScrollOnOpen) return;

    lockScroll(true);

    return () => {
      lockScroll(false);
    };
  }, [lockScrollOnOpen]);

  return root;
};
