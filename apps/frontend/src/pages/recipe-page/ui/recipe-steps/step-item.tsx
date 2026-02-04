import { type FC, useState } from "react";

import type { RecipeStepType } from "@/entities/recipe";

import UiTag from "@/shared/ui/ui-tag/ui-tag.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./recipe-steps.module.scss";

const StepItem: FC<RecipeStepType> = ({ stepNumber, image, description }) => {
  const [showImage, setShowImage] = useState(true);
  const imageUrl = `${import.meta.env.VITE_ASSETS_URL}/${image}`;

  return (
    <div className={styles.step}>
      {showImage && (
        <div className={styles["step__image-container"]}>
          <img
            src={imageUrl}
            alt="cooking-step"
            className={styles.step__image}
            onError={() => setShowImage(false)}
          />
        </div>
      )}
      <div className={styles.step__info}>
        <UiTag icon="Шаг" color="blackSoft" className={styles.step__tag}>
          {stepNumber}
        </UiTag>
        <UiTypography variant="sm">{description}</UiTypography>
      </div>
    </div>
  );
};

export default StepItem;
