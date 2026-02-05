import type { FC, ReactNode } from "react";
import cn from "clsx";

import TriangleIcon from "@/shared/assets/icons/triangle.svg?react";

import styles from "./ui-counter.module.scss";

type Props = {
  label?: ReactNode;
  value: number;
  increment: () => void;
  decrement: () => void;
  className?: string;
};

const UiCounter: FC<Props> = ({
  label,
  value,
  increment,
  decrement,
  className,
}) => {
  return (
    <div className={className}>
      {label}
      <div className={styles["number-stepper"]}>
        <button
          type="button"
          className={cn(styles["stepper-btn"], styles["decrement"])}
          onClick={decrement}
        >
          <TriangleIcon />
        </button>

        <input type="number" value={value} min={0} max={999} step={1} />

        <button
          type="button"
          className={cn(styles["stepper-btn"], styles["increment"])}
          onClick={increment}
        >
          <TriangleIcon />
        </button>
      </div>
    </div>
  );
};

export default UiCounter;
