import type { FC } from "react";
import { useEffect } from "react";
import cn from "clsx";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

import type { RecipeIngredientType } from "@/entities/recipe";

import { UiTypography } from "@/shared/ui/ui-typography";

import { ingredientItemVariants } from "../../config";

import styles from "./index.module.scss";

type Props = RecipeIngredientType & {
  from: number;
  to: number;
  className?: string;
  index: number;
  shouldAnimate: boolean;
};

const IngredientItem: FC<Props> = ({
  title,
  measureUnit,
  className,
  index,
  from,
  to,
  shouldAnimate,
  count,
}) => {
  const motionCount = useMotionValue(from);
  const rounded = useTransform(motionCount, Math.round);

  useEffect(() => {
    const controls = animate(motionCount, to, {
      duration: 1.2,
      delay: 0,
      ease: [0.16, 1, 0.3, 1],
    });

    return controls.stop;
  }, [to, motionCount]);

  return (
    <motion.div
      className={cn(styles.ingredients__item, className)}
      variants={ingredientItemVariants}
      initial="rest"
      whileHover="hover"
      transition={{ delay: index * 0.04 }}
      style={{ originX: 0 }}
    >
      <UiTypography variant="sm" fontWeight="medium">
        {title}
      </UiTypography>
      <div className={styles["ingredients__item-count"]}>
        <UiTypography variant="sm" fontWeight="bold">
          <motion.span>{shouldAnimate ? rounded : count}</motion.span>
        </UiTypography>
        <UiTypography variant="sm" fontWeight="medium">
          {measureUnit}
        </UiTypography>
      </div>
    </motion.div>
  );
};

export default IngredientItem;
