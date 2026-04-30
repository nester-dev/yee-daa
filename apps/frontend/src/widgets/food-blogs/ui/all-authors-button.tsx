import { useNavigate } from "react-router";
import cn from "clsx";

import ArrowIcon from "@/shared/assets/icons/arrow-left.svg?react";
import { ROUTE_PATHS } from "@/shared/config/route-paths";
import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./food-blogs.module.scss";

type Props = {
  className?: string;
};

export const AllAuthorsButton = ({ className }: Props) => {
  const navigate = useNavigate();
  return (
    <UiButton
      variant="text"
      icon={<ArrowIcon className={styles.icon} />}
      iconPosition="end"
      className={cn(styles.button, className)}
      onClick={() => navigate(ROUTE_PATHS.FOOD_BLOGS)}
    >
      <UiTypography fontWeight="semibold" variant="lg">
        Все авторы
      </UiTypography>
    </UiButton>
  );
};
