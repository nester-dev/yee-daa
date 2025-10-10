import { type FC, type PropsWithChildren, useMemo } from "react";
import type {
  ColorVariants,
  FontWeightVariants,
  TypographyVariants,
} from "./types.ts";
import { COLORS_MAP } from "@/shared/config/colors-map.ts";
import { getTypographyClasses } from "@/shared/ui/ui-typography/helper.ts";
import cn from "clsx";

export type TypographyProps = PropsWithChildren<{
  tag?: keyof HTMLElementTagNameMap;
  variant?: TypographyVariants;
  color?: ColorVariants;
  fontWeight?: FontWeightVariants;
  className?: string;
}>;

const UiTypography: FC<TypographyProps> = ({
  tag = "p",
  color = "black",
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

  return (
    <Tag className={cn(classes)} style={{ color: `var(${COLORS_MAP[color]})` }}>
      {children}
    </Tag>
  );
};

export default UiTypography;
