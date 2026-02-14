import type { FC } from "react";
import { useFormContext } from "react-hook-form";

import TrashIcon from "@/shared/assets/icons/trash-icon.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiImageUpload from "@/shared/ui/ui-image-upload/ui-image-upload.tsx";
import UiTag from "@/shared/ui/ui-tag/ui-tag.tsx";
import UiTextarea from "@/shared/ui/ui-textarea/ui-textarea.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import type { NewRecipeSchemaType } from "../../model/new-recipe-schema.ts";

import styles from "./add-steps.module.scss";

type Props = {
  index: number;
  totalSteps: number;
  onDelete: (index: number) => void;
};

const Step: FC<Props> = ({ index, onDelete, totalSteps }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewRecipeSchemaType>();
  const stepNumber = index + 1;
  const onlyOneStep = totalSteps === 1;

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
          {!onlyOneStep && (
            <UiIconButton size="inherit" onClick={() => onDelete(index)}>
              <TrashIcon />
            </UiIconButton>
          )}
        </div>
        <UiTextarea
          className={styles.description}
          placeholder="Шаг"
          {...register(`steps.${index}.description`)}
          error={!!errors.steps?.[index]}
        />
      </div>
    </div>
  );
};

export default Step;
