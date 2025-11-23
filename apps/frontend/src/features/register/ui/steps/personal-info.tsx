import type { FC } from "react";

import UiInput from "@/shared/ui/ui-input/ui-input.tsx";

import { type RegisterFormType } from "../../model/register-form-schema.ts";
import type { FormFieldProps } from "../../model/types.ts";

type Props = Partial<
  Pick<RegisterFormType, "firstName" | "lastName" | "email">
> &
  FormFieldProps<RegisterFormType>;

const PersonalInfo: FC<Props> = ({
  firstName = "",
  lastName = "",
  email = "",
  onChange,
  errors,
}) => {
  return (
    <>
      <UiInput
        name="firstName"
        value={firstName}
        label="Ваше имя"
        placeholder="Имя"
        onChange={onChange}
        error={errors?.firstName?.at(0)}
      />
      <UiInput
        name="lastName"
        value={lastName}
        label="Ваша фамилия"
        placeholder="Фамилия"
        onChange={onChange}
        error={errors?.lastName?.at(0)}
      />
      <UiInput
        name="email"
        value={email}
        label="Ваш e-mail"
        placeholder="e-mail"
        onChange={onChange}
        error={errors?.email?.at(0)}
      />
    </>
  );
};

export default PersonalInfo;
