import type { FC } from "react";

import {
  setAllergens,
  toggleExcludeAllergens,
} from "@/features/select-allergens/model/slice.ts";
import { resetFilters } from "@/features/select-filters";

import { useAppDispatch } from "@/shared/lib/hooks.ts";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./filters-drawer.module.scss";

const ActionButtons: FC = () => {
  const dispatch = useAppDispatch();
  const handleFiltersReset = () => {
    dispatch(resetFilters());
    dispatch(setAllergens([]));
    dispatch(toggleExcludeAllergens(false));
  };

  return (
    <div className={styles.buttons}>
      <UiButton color="primary" onClick={handleFiltersReset}>
        <UiTypography variant="lg" fontWeight="semibold">
          Очистить фильтр
        </UiTypography>
      </UiButton>

      <UiButton color="secondary">
        <UiTypography variant="lg" fontWeight="semibold" color="white">
          Найти рецепт
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default ActionButtons;
