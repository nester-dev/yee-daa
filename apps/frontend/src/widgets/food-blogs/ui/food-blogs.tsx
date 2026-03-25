import { useGetBloggersQuery } from "@/entities/bloggers";

import ArrowIcon from "@/shared/assets/icons/arrow-left.svg?react";
import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./food-blogs.module.scss";

export const FoodBlogs = () => {
  const { data } = useGetBloggersQuery();
  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UiTypography variant="xl-4">Кулинарные блоги</UiTypography>
        <UiButton
          variant="text"
          icon={<ArrowIcon className={styles.icon} />}
          iconPosition="end"
          className={styles.button}
        >
          <UiTypography fontWeight="semibold" variant="lg">
            Все авторы
          </UiTypography>
        </UiButton>
      </div>
    </div>
  );
};
