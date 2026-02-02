import { type FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "motion";

import { Sidebar } from "@/widgets/sidebar";

import UiBackdrop from "@/shared/ui/ui-backdrop/ui-backdrop";

import type { BurgerProps } from "../model/types.ts";

import styles from "./header.module.scss";

const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -22,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.18,
      ease: "easeInOut",
    },
  },
};

const BurgerMenu: FC<BurgerProps> = ({ onClick, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <UiBackdrop onClick={onClick} />

          <motion.div
            className={styles.menu}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Sidebar />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BurgerMenu;
