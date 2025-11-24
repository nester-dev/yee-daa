import { type ChangeEvent, type FC, type FormEvent, useState } from "react";

import { useLoginMutation } from "@/entities/auth";

import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import EyeSlashIcon from "@/shared/assets/icons/eye-slash.svg?react";
import { validateForm } from "@/shared/lib/validate-form.ts";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import {
  LoginFormSchema,
  type LoginFormType,
} from "../model/login-form-schema.ts";

import styles from "./login-form.module.scss";

const LoginForm: FC = () => {
  const [formData, setFormData] = useState<LoginFormType>({
    login: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const errors = showErrors
    ? validateForm(LoginFormSchema, formData)
    : undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(LoginFormSchema, formData);

    if (errors) {
      setShowErrors(true);
      return;
    }
    login(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <UiInput
        name="login"
        value={formData.login || ""}
        onChange={handleChange}
        label="Логин для входа на сайт"
        placeholder="Введите логин"
        error={errors?.login?.at(0)}
      />

      <UiInput
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password || ""}
        onChange={handleChange}
        label="Пароль"
        placeholder="Пароль для сайта"
        error={errors?.password?.at(0)}
        suffix={
          showPassword ? (
            <UiIconButton onClick={() => setShowPassword(false)}>
              <EyeIcon />
            </UiIconButton>
          ) : (
            <UiIconButton onClick={() => setShowPassword(true)}>
              <EyeSlashIcon />
            </UiIconButton>
          )
        }
      />

      <div className={styles.buttons}>
        <UiButton
          variant="solid"
          color="secondary"
          fullWidth
          disabled={isLoading}
        >
          <UiTypography variant="lg" fontWeight="semibold" color="white">
            Войти
          </UiTypography>
        </UiButton>

        <UiButton variant="text" fullWidth>
          <UiTypography variant="text" fontWeight="semibold">
            Забыли логин или пароль?
          </UiTypography>
        </UiButton>
      </div>
    </form>
  );
};

export default LoginForm;
