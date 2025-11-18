import { type ChangeEvent, type FC, type FormEvent, useState } from "react";

import type { LoginFormType } from "@/widgets/login-form/model/login-form-schema.ts";

import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import EyeSlashIcon from "@/shared/assets/icons/eye-slash.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";

import styles from "./login-form.module.scss";

const LoginForm: FC = () => {
  const [formData, setFormData] = useState<Partial<LoginFormType>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      />

      <UiInput
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password || ""}
        onChange={handleChange}
        label="Пароль"
        placeholder="Пароль для сайта"
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
    </form>
  );
};

export default LoginForm;
