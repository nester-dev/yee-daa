import { forwardRef } from "react";
import cn from "clsx";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./ui-tabs.module.scss";

export type TabValue = string | number;

export type TabItem = {
  value: TabValue;
  title: string;
};

interface Props extends TabItem {
  isActive: boolean;
  onCLick: () => void;
}

const UiTabItem = forwardRef<HTMLLIElement, Props>(
  ({ onCLick, isActive, title }, ref) => (
    <li ref={ref} onClick={onCLick} onKeyDown={onCLick}>
      <UiTypography
        variant="lg"
        className={cn(
          styles["tab-item"],
          isActive && styles["tab-item--active"],
        )}
      >
        {title}
      </UiTypography>
    </li>
  ),
);

export default UiTabItem;
