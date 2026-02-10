import { type FC, useEffect } from "react";

import type { RecipeStepType } from "@/entities/recipe";

import AddIcon from "@/shared/assets/icons/plus-rounded.svg?react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux.ts";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { EmptyStep } from "../../config";
import { selectRecipeSteps } from "../../model/selectors.ts";
import {
  deleteRecipeStep,
  resetRecipeSteps,
  setRecipeStep,
  updateRecipeStep,
} from "../../model/slice.ts";

import Step from "./step.tsx";

import styles from "./add-steps.module.scss";

const AddSteps: FC = () => {
  const steps = useAppSelector(selectRecipeSteps);
  const dispatch = useAppDispatch();

  const handleAddStep = () => {
    dispatch(
      setRecipeStep({
        ...EmptyStep,
        stepNumber: steps.length + 1,
      }),
    );
  };

  const handleRemove = (index: number) => {
    dispatch(deleteRecipeStep(index));
  };

  const handleChange = (index: number, step: RecipeStepType) => {
    dispatch(updateRecipeStep({ step, stepIndex: index }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetRecipeSteps());
    };
  }, [dispatch]);

  return (
    <section className={styles.steps}>
      <UiTypography fontWeight="semibold">
        Добавьте шаги приготовления
      </UiTypography>
      <div>
        {steps.map((step, idx) => (
          <Step
            key={idx}
            index={idx}
            step={step}
            onDelete={handleRemove}
            onChange={handleChange}
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
