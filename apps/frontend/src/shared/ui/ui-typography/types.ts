import type { COLORS_MAP } from "@/shared/config/colors-map.ts";

export type TypographyVariants = "title" | "text" | "xs" | "sm" | "lg" | "xxl";
export type FontWeightVariants = "regular" | "medium" | "semibold" | "bold";
export type TextAlignVariants = "left" | "center" | "right" | "justify";

export type ColorVariants = keyof typeof COLORS_MAP;
