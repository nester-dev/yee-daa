import type { FC } from "react";

import {
  resetFilters,
  setAllergens,
  toggleExcludeAllergens,
  toggleIsFiltersApplied,
} from "@/features/select-filters";

import { useAppDispatch } from "@/shared/lib/redux.ts";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./filters-drawer.module.scss";

type Props = {
  onFiltersApply: () => void;
};

const ActionButtons: FC<Props> = ({ onFiltersApply }) => {
  const dispatch = useAppDispatch();

  const handleFiltersReset = () => {
    dispatch(resetFilters());
    dispatch(setAllergens([]));
    dispatch(toggleExcludeAllergens(false));
  };

  const handleFiltersApply = () => {
    dispatch(toggleIsFiltersApplied(true));
    onFiltersApply();
  };

  return (
    <div className={styles.buttons}>
      <UiButton color="primary" onClick={handleFiltersReset}>
        <UiTypography variant="lg" fontWeight="semibold">
          Очистить фильтр
        </UiTypography>
      </UiButton>

      <UiButton color="secondary" onClick={handleFiltersApply}>
        <UiTypography variant="lg" fontWeight="semibold" color="white">
          Найти рецепт
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default ActionButtons;
