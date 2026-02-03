import type { FC } from "react";

import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import type { RecipeType } from "../model/types.ts";

import styles from "./recipe-row.module.scss";

type Props = Pick<RecipeType, "title"> & {
  categoryIcon: string;
  onClick: () => void;
};

const RecipeRow: FC<Props> = ({ categoryIcon, title, onClick }) => {
  return (
    <div className={styles.row} onClick={onClick}>
      <img
        className={styles.icon}
        src={`${import.meta.env.VITE_ASSETS_URL}/${categoryIcon}`}
        alt="category icon"
      />

      <UiTypography variant="lg" fontWeight="medium" className={styles.text}>
        {title}
      </UiTypography>

      <UiButton size="sm" variant="outlined" className={styles.button}>
        <UiTypography variant="sm" fontWeight="semibold" color="greenPrimary">
          Готовить
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default RecipeRow;
