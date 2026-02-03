import { type FC, useState } from "react";
import cn from "clsx";
import { motion } from "framer-motion";

import type { RecipeIngredientType } from "@/entities/recipe";

import { UiTypography } from "@/shared/ui/ui-typography";

import IngredientItem from "./ingredient-item";
import PortionCounter from "./portion-counter.tsx";

import styles from "./index.module.scss";

type Props = {
  ingredients?: RecipeIngredientType[];
};

const Ingredients: FC<Partial<Props>> = ({ ingredients }) => {
  const [portionCount, setPortionCount] = useState(1);

  const handleDecrement = () => {
    if (portionCount > 1) {
      setPortionCount((count) => count - 1);
    }
  };

  const handleIncrement = () => {
    if (portionCount < 999) {
      setPortionCount((count) => count + 1);
    }
  };

  return (
    <div className={styles.ingredients}>
      <div className={styles.ingredients__heading}>
        <UiTypography variant="xs" fontWeight="bold" color="greenPrimary">
          ИНГРЕДИЕНТЫ
        </UiTypography>
        <div className={styles.ingredients__count}>
          <PortionCounter
            value={portionCount}
            increment={handleIncrement}
            decrement={handleDecrement}
          />
        </div>
      </div>
      <motion.div whileHover="hover">
        {ingredients?.map((ingredient, idx) => {
          const from = Number(ingredient.count);
          const to = from * portionCount;

          return (
            <IngredientItem
              key={ingredient.title}
              {...ingredient}
              index={idx}
              shouldAnimate={!!from}
              from={from}
              to={to}
              className={cn(idx & 1 && styles["ingredients__item-odd"])}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default Ingredients;
