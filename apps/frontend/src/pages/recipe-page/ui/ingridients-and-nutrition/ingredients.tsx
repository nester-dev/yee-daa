import { type FC } from "react";
import cn from "clsx";
import { motion } from "framer-motion";

import type { RecipeIngredientType } from "@/entities/recipe";

import { useCounter } from "@/shared/ui/ui-counter/useCounter.ts";
import { UiTypography } from "@/shared/ui/ui-typography";

import UiCounter from "../../../../shared/ui/ui-counter/ui-counter.tsx";

import IngredientItem from "./ingredient-item";

import styles from "./index.module.scss";

type Props = {
  ingredients?: RecipeIngredientType[];
};

const Ingredients: FC<Partial<Props>> = ({ ingredients }) => {
  const {
    count: portionCount,
    handleIncrement,
    handleDecrement,
  } = useCounter({
    initialValue: 1,
  });

  return (
    <div className={styles.ingredients}>
      <div className={styles.ingredients__heading}>
        <UiTypography variant="xs" fontWeight="bold" color="greenPrimary">
          ИНГРЕДИЕНТЫ
        </UiTypography>
        <UiCounter
          label={
            <UiTypography variant="xs" fontWeight="bold" color="greenPrimary">
              ПОРЦИЙ
            </UiTypography>
          }
          className={styles.ingredients__count}
          value={portionCount}
          increment={handleIncrement}
          decrement={handleDecrement}
        />
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
