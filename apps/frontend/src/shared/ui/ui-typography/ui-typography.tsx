import { type FC, type PropsWithChildren, useMemo } from "react";
import cn from "clsx";

import { COLORS_MAP } from "@/shared/config/colors-map.ts";
import { getTypographyClasses } from "@/shared/ui/ui-typography/helper.ts";

import type {
  ColorVariants,
  FontWeightVariants,
  TypographyVariants,
} from "./types.ts";

export type TypographyProps = PropsWithChildren<{
  tag?: keyof HTMLElementTagNameMap;
  variant?: TypographyVariants;
  color?: ColorVariants;
  fontWeight?: FontWeightVariants;
  className?: string;
}>;

const UiTypography: FC<TypographyProps> = ({
  tag = "p",
  color,
  variant,
  fontWeight,
  className,
  children,
}) => {
  const Tag = useMemo(() => tag, [tag]);
  const classes = useMemo(
    () => getTypographyClasses({ variant, fontWeight, className }),
    [variant, fontWeight, className],
  );
  const style = color ? { color: `var(${COLORS_MAP[color]})` } : {};

  return (
    <Tag className={cn(classes)} style={style}>
      {children}
    </Tag>
  );
};

export default UiTypography;
