import type { FC } from "react";

import { useAppDispatch, useAppSelector } from "@/shared/lib/redux.ts";
import UiToggle from "@/shared/ui/ui-toggle/ui-toggle.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { selectIsAllergensExcluded } from "../model/selectors.ts";
import { toggleExcludeAllergens } from "../model/slice.ts";

import styles from "./select-allergens.module.scss";

const ExcludeAllergens: FC = () => {
  const isExcluded = useAppSelector(selectIsAllergensExcluded);
  const dispatch = useAppDispatch();
  const handleExclude = () => {
    dispatch(toggleExcludeAllergens(!isExcluded));
  };

  return (
    <div className={styles.allergens}>
      <UiTypography fontWeight="medium">Исключить аллергены</UiTypography>
      <UiToggle toggled={isExcluded} onToggle={handleExclude} />
    </div>
  );
};

export default ExcludeAllergens;
