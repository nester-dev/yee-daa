import type { FC } from "react";

import type { RecipeStepType } from "@/entities/recipe";

import { UiTypography } from "@/shared/ui/ui-typography";

import StepItem from "./step-item.tsx";

import styles from "./recipe-steps.module.scss";

type Props = {
  steps?: RecipeStepType[];
};

const RecipeSteps: FC<Props> = ({ steps }) => {
  return (
    <div className={styles.steps}>
      <UiTypography variant="title" fontWeight="medium">
        Шаги приготовления
      </UiTypography>

      {steps?.map((step) => (
        <StepItem key={step.stepNumber} {...step} />
      ))}
    </div>
  );
};

export default RecipeSteps;
