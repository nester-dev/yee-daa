import type { FC } from "react";

import BookMarkIcon from "@/shared/assets/icons/bookmark-heart.svg?react";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./juciest.module.scss";

const ActionButtons: FC = () => {
  return (
    <div className={styles.actions}>
      <UiButton size="sm" icon={<BookMarkIcon />}>
        <UiTypography
          variant="sm"
          fontWeight="semibold"
          className={styles.save}
        >
          Сохранить
        </UiTypography>
      </UiButton>

      <UiButton color="secondary" size="sm">
        <UiTypography color="white" variant="sm" fontWeight="semibold">
          Готовить
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default ActionButtons;
