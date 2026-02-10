import type { FC } from "react";

import type { RecipeStepType } from "@/entities/recipe";

import TrashIcon from "@/shared/assets/icons/trash-icon.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiImageUpload from "@/shared/ui/ui-image-upload/ui-image-upload.tsx";
import UiTag from "@/shared/ui/ui-tag/ui-tag.tsx";
import UiTextarea from "@/shared/ui/ui-textarea/ui-textarea.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./add-steps.module.scss";

type Props = {
  step: RecipeStepType;
  index: number;
  onDelete: (index: number) => void;
  onChange: (index: number, step: RecipeStepType) => void;
};

const Step: FC<Props> = ({ index, step, onDelete, onChange }) => {
  const stepNumber = index + 1;

  return (
    <div className={styles.step}>
      <UiImageUpload className={styles.image} />
      <div className={styles.details}>
        <div className={styles.details__top}>
          <UiTag icon="Шаг" color="blackSoft" className={styles.details__tag}>
            <UiTypography variant="xs" fontWeight="semibold" tag="span">
              {stepNumber}
            </UiTypography>
          </UiTag>
          <UiIconButton size="inherit" onClick={() => onDelete(index)}>
            <TrashIcon />
          </UiIconButton>
        </div>
        <UiTextarea
          className={styles.description}
          value={step.description}
          placeholder="Шаг"
          onChange={(e) =>
            onChange(index, {
              ...step,
              description: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default Step;
