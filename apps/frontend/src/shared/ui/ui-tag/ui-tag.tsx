import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
} from "react";
import cn from "clsx";

import CloseIcon from "@/shared/assets/icons/close-icon.svg?react";
import { COLORS_MAP } from "@/shared/config/colors-map.ts";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./ui-tag.module.scss";

type Props = PropsWithChildren<{
  color: keyof typeof COLORS_MAP;
  className?: string;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
}>;

const UiTag: FC<Props> = ({
  icon,
  className,
  color,
  children,
  closable,
  onClose,
}) => {
  const style = useMemo(
    () => ({
      ...(color && { backgroundColor: `var(${COLORS_MAP[color]})` }),
    }),
    [color],
  );

  return (
    <div className={cn(styles.tag, styles[color], className)} style={style}>
      {icon && icon}
      <UiTypography variant="sm">{children}</UiTypography>
      {closable && (
        <UiIconButton size="inherit" onClick={onClose}>
          <CloseIcon />
        </UiIconButton>
      )}
    </div>
  );
};

export default UiTag;
