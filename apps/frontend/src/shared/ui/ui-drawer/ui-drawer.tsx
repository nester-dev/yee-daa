import type { FC, PropsWithChildren } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import CrossIcon from "@/shared/assets/icons/cross-filled-icon.svg?react";
import UiBackdrop from "@/shared/ui/ui-backdrop/ui-backdrop";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button";

import { UiTypography } from "../ui-typography";

import styles from "./ui-drawer.module.scss";

export type UiDrawerProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
}>;

const drawerVariants: Variants = {
  visible: {
    x: 0,
    transition: {
      ease: "easeOut",
    },
  },
  hidden: {
    x: "100%",
    transition: {
      ease: "easeOut",
    },
  },
};

const UiDrawer: FC<UiDrawerProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <UiBackdrop onClick={onClose}>
          <motion.div
            className={styles.drawer}
            variants={drawerVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.heading}>
                  <UiTypography variant="xxl" fontWeight="bold">
                    {title}
                  </UiTypography>
                  <UiIconButton size="xs" onClick={onClose}>
                    <CrossIcon />
                  </UiIconButton>
                </div>
                {children}
              </div>
            </div>
          </motion.div>
        </UiBackdrop>
      )}
    </AnimatePresence>
  );
};

export default UiDrawer;
