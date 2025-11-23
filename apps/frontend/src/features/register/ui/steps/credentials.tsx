import { type FC, useState } from "react";

import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import EyeSlashIcon from "@/shared/assets/icons/eye-slash.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";

import type { RegisterFormType } from "../../model/register-form-schema.ts";
import type { FormFieldProps } from "../../model/types.ts";

type Props = Partial<
  Pick<RegisterFormType, "login" | "password" | "confirmPassword">
> &
  FormFieldProps<RegisterFormType>;

const Credentials: FC<Props> = ({
  login = "",
  password = "",
  confirmPassword = "",
  onChange,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getInputSuffix = (
    showPassword: boolean,
    setShowPassword: (show: boolean) => void,
  ) =>
    showPassword ? (
      <UiIconButton onClick={() => setShowPassword(false)}>
        <EyeIcon />
      </UiIconButton>
    ) : (
      <UiIconButton onClick={() => setShowPassword(true)}>
        <EyeSlashIcon />
      </UiIconButton>
    );

  return (
    <>
      <UiInput
        name="login"
        value={login}
        onChange={onChange}
        label="Логин для входа на сайт"
        placeholder="Логин"
        helperText="Логин не менее 5 символов, только латиница и !@#$&_+-."
        error={errors?.login?.at(0)}
      />
      <UiInput
        name="password"
        value={password}
        onChange={onChange}
        label="Пароль"
        placeholder="Ваш пароль"
        helperText="Пароль не менее 8 символов, с заглавной буквой и цифрой"
        type={showPassword ? "text" : "password"}
        suffix={getInputSuffix(showPassword, setShowPassword)}
        error={errors?.password?.at(0)}
      />
      <UiInput
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        label="Повторите пароль"
        placeholder="Повторите пароль"
        type={showConfirmPassword ? "text" : "password"}
        suffix={getInputSuffix(showConfirmPassword, setShowConfirmPassword)}
        error={!!errors?.confirmPassword?.at(0)}
      />
    </>
  );
};

export default Credentials;
