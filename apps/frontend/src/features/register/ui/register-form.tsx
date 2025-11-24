import { type ChangeEvent, type FC, useState } from "react";

import { useRegisterMutation } from "@/entities/auth";

import { validateForm } from "@/shared/lib/validate-form.ts";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import UiProgressBar from "@/shared/ui/ui-progress-bar/ui-progress-bar.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { getCurrentStepConfig } from "../lib/config.ts";
import { type RegisterFormType } from "../model/register-form-schema.ts";
import { RegisterFormSteps } from "../model/types.ts";

import Credentials from "./steps/credentials.tsx";
import PersonalInfo from "./steps/personal-info.tsx";

import styles from "./register-form.module.scss";

const RegisterForm: FC = () => {
  const [currentStep, setCurrentStep] = useState(
    RegisterFormSteps.PERSONAL_INFO,
  );
  const [formData, setFormData] = useState<RegisterFormType>({
    firstName: "",
    lastName: "",
    email: "",
    login: "",
    password: "",
    confirmPassword: "",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const { title, schema, buttonText } = getCurrentStepConfig(currentStep);
  const errors = showErrors ? validateForm(schema, formData) : undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProceed = () => {
    const errors = validateForm(schema, formData);

    if (errors) {
      setShowErrors(true);
      return;
    }

    switch (currentStep) {
      case RegisterFormSteps.PERSONAL_INFO:
        setShowErrors(false);
        setCurrentStep(RegisterFormSteps.CREDENTIALS);
        break;
      case RegisterFormSteps.CREDENTIALS:
        register(formData);
        break;
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <UiProgressBar title={title} progress={0} />
      {
        {
          [RegisterFormSteps.PERSONAL_INFO]: (
            <PersonalInfo
              firstName={formData.firstName}
              lastName={formData.lastName}
              email={formData.email}
              onChange={handleChange}
              errors={errors}
            />
          ),
          [RegisterFormSteps.CREDENTIALS]: (
            <Credentials
              login={formData.login}
              password={formData.password}
              confirmPassword={formData.confirmPassword}
              onChange={handleChange}
              errors={errors}
            />
          ),
        }[currentStep]
      }
      <UiButton
        variant="solid"
        color="secondary"
        onClick={handleProceed}
        disabled={isLoading}
      >
        <UiTypography variant="lg" fontWeight="semibold" color="white">
          {buttonText}
        </UiTypography>
      </UiButton>
    </form>
  );
};

export default RegisterForm;
