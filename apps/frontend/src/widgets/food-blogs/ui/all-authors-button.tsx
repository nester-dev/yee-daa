import cn from "clsx";

import ArrowIcon from "@/shared/assets/icons/arrow-left.svg?react";
import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./food-blogs.module.scss";

type Props = {
  className?: string;
  onClick: () => void;
  text?: string;
};

export const AllAuthorsButton = ({ className, onClick, text }: Props) => {
  return (
    <UiButton
      variant="text"
      icon={<ArrowIcon className={styles.icon} />}
      iconPosition="end"
      className={cn(styles.button, className)}
      onClick={onClick}
    >
      <UiTypography fontWeight="semibold" variant="lg">
        {text || "Все авторы"}
      </UiTypography>
    </UiButton>
  );
};
