import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
} from "react";
import cn from "clsx";

import { COLORS_MAP } from "@/shared/config/colors-map.ts";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./ui-tag.module.scss";

type Props = PropsWithChildren<{
  color: keyof typeof COLORS_MAP;
  className?: string;
  icon?: ReactNode;
}>;

const UiTag: FC<Props> = ({ icon, className, color, children }) => {
  const style = useMemo(
    () => ({
      ...(color && { backgroundColor: `var(${COLORS_MAP[color]})` }),
    }),
    [color],
  );

  return (
    <div className={cn(styles.tag, className)} style={style}>
      {icon && icon}
      <UiTypography variant="sm">{children}</UiTypography>
    </div>
  );
};

export default UiTag;
