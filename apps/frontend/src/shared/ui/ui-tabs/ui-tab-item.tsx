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
  onClick: () => void;
}

const UiTabItem = forwardRef<HTMLLIElement | null, Props>(
  ({ onClick, isActive, title }, ref) => (
    <li ref={ref} onClick={onClick} onKeyDown={onClick}>
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
