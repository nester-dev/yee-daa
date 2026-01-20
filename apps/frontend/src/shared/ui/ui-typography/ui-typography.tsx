import { type FC, type PropsWithChildren, useMemo } from "react";
import cn from "clsx";

import { COLORS_MAP } from "@/shared/config/colors-map.ts";
import { getTypographyClasses } from "@/shared/ui/ui-typography/helper.ts";

import type {
  ColorVariants,
  FontWeightVariants,
  TextAlignVariants,
  TypographyVariants,
} from "./types.ts";

export type TypographyProps = PropsWithChildren<{
  tag?: keyof HTMLElementTagNameMap;
  variant?: TypographyVariants;
  color?: ColorVariants;
  fontWeight?: FontWeightVariants;
  align?: TextAlignVariants;
  className?: string;
}>;

const UiTypography: FC<TypographyProps> = ({
  tag = "p",
  color,
  variant,
  fontWeight,
  className,
  children,
  align,
}) => {
  const Tag = useMemo(() => tag, [tag]);
  const classes = useMemo(
    () => getTypographyClasses({ variant, fontWeight, className }),
    [variant, fontWeight, className],
  );

  const style = useMemo(
    () => ({
      ...(color && { color: `var(${COLORS_MAP[color]})` }),
      ...(align && { textAlign: align }),
    }),
    [color, align],
  );

  return (
    <Tag className={cn(classes)} style={style}>
      {children}
    </Tag>
  );
};

export default UiTypography;
