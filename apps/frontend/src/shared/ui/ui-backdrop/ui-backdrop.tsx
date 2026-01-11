import type { FC, PropsWithChildren } from "react";
import cn from "clsx";
import { motion } from "framer-motion";

import styles from "./ui-backdrop.module.scss";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

type Props = PropsWithChildren<{
  onClick?: () => void;
  className?: string;
}>;

const UiBackdrop: FC<Props> = ({ onClick, children, className }) => (
  <motion.div
    className={cn(styles.backdrop, className)}
    variants={backdrop}
    animate="visible"
    initial="hidden"
    exit="hidden"
    onClick={onClick}
  >
    {children}
  </motion.div>
);

export default UiBackdrop;
