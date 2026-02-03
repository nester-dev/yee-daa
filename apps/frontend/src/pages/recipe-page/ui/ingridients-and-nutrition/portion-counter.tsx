import type { FC } from "react";
import cn from "clsx";

import TriangleIcon from "@/shared/assets/icons/triangle.svg?react";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./portion-counter.module.scss";

type Props = {
  value: number;
  increment: () => void;
  decrement: () => void;
};

const PortionCounter: FC<Props> = ({ value, increment, decrement }) => {
  return (
    <>
      <UiTypography variant="xs" fontWeight="bold" color="greenPrimary">
        ПОРЦИЙ
      </UiTypography>
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
    </>
  );
};

export default PortionCounter;
