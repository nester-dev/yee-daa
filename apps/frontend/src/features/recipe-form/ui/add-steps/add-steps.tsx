import { type FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import AddIcon from "@/shared/assets/icons/plus-rounded.svg?react";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { EmptyStep } from "../../config";

import Step from "./step.tsx";

import styles from "./add-steps.module.scss";

const AddSteps: FC = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const handleAddStep = () => {
    append({
      ...EmptyStep,
      stepNumber: fields.length + 1,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <section className={styles.steps}>
      <UiTypography fontWeight="semibold">
        Добавьте шаги приготовления
      </UiTypography>
      <div>
        {fields.map((field, idx) => (
          <Step
            key={field.id}
            index={idx}
            totalSteps={fields.length}
            onDelete={handleRemove}
          />
        ))}
      </div>
      <UiButton
        icon={<AddIcon />}
        iconPosition="end"
        size="sm"
        className={styles.add}
        onClick={handleAddStep}
      >
        <UiTypography variant="sm" fontWeight="semibold">
          Новый шаг
        </UiTypography>
      </UiButton>
    </section>
  );
};

export default AddSteps;
