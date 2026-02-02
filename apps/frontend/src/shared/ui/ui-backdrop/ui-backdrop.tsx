import type { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import cn from "clsx";
import { motion } from "framer-motion";

import { usePortalRoot } from "@/shared/lib/use-portal-root.ts";

import styles from "./ui-backdrop.module.scss";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

type Props = PropsWithChildren<{
  onClick?: () => void;
  className?: string;
}>;

const UiBackdrop: FC<Props> = ({ onClick, children, className }) => {
  const backdropRoot = usePortalRoot({});

  return createPortal(
    <motion.div
      className={cn(styles.backdrop, className)}
      variants={backdrop}
      animate="visible"
      initial="hidden"
      exit="hidden"
      onClick={onClick}
    >
      {children}
    </motion.div>,
    backdropRoot,
  );
};
export default UiBackdrop;
