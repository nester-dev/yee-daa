import type { TypographyProps } from "@/shared/ui/ui-typography/ui-typography.tsx";
import styles from "./ui-typography.module.scss";

export const getTypographyClasses = ({
  fontWeight = "regular",
  variant = "text",
  className,
}: TypographyProps) => [
  styles[variant],
  styles[`font-${fontWeight}`],
  className,
];
