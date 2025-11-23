import {
  CredentialsSchema,
  PersonalInfoSchema,
} from "../model/register-form-schema.ts";
import { RegisterFormSteps } from "../model/types.ts";

export const getCurrentStepConfig = (step: RegisterFormSteps) => {
  switch (step) {
    case RegisterFormSteps.PERSONAL_INFO:
      return {
        title: "Шаг 1. Личная информация",
        schema: PersonalInfoSchema,
        buttonText: "Дальше",
      };
    case RegisterFormSteps.CREDENTIALS:
      return {
        title: "Шаг 2. Логин и пароль",
        schema: CredentialsSchema,
        buttonText: "Зарегистрироваться",
      };
  }
};
