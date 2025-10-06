import { type FC, type PropsWithChildren, useMemo } from 'react';
import type { ColorVariants, FontWeightVariants, TypographyVariants } from "./types.ts";
import { COLORS_MAP } from "@/shared/config/colors-map.ts";
import { getTypographyClasses } from "@/shared/ui/ui-typography/helper.ts";
import cn from 'clsx';

export type TypographyProps = PropsWithChildren<{
  tag?: keyof HTMLElementTagNameMap
  variant?: TypographyVariants
  color?: ColorVariants
  fontWeight?: FontWeightVariants
}>

const UiTypography: FC<TypographyProps> = ({ tag = "p", color = 'black', variant, fontWeight, children }) => {
  const Tag = useMemo(() => tag, [tag]);
  const classes = useMemo(() => getTypographyClasses({ variant, fontWeight }), [variant, fontWeight]);

  return (
    <Tag className={cn(classes)} style={{ color: `var(${COLORS_MAP[color]})` }}>
      {children}
    </Tag>
  );
};

export default UiTypography;