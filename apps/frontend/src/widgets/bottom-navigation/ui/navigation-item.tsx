import type { FC, PropsWithChildren, ReactNode } from "react";
import cn from "clsx";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./bottom-navigation.module.scss";

type Props = PropsWithChildren<{
  isActive?: boolean;
  icon: ReactNode;
  onClick: () => void;
}>;

const NavigationItem: FC<Props> = ({ children, isActive, icon, onClick }) => {
  return (
    <button onClick={onClick}>
      <div
        className={cn(styles["navigation__item"], isActive && styles.active)}
      >
        <span className={styles["navigation__icon"]}>{icon}</span>
        <UiTypography
          variant="xs"
          fontWeight={isActive ? "medium" : "regular"}
          color={isActive ? "black" : "blackOverlay"}
        >
          {children}
        </UiTypography>
      </div>
    </button>
  );
};

export default NavigationItem;
