import { FormProvider, useForm } from "react-hook-form";
import cn from "clsx";

import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button";
import UiInput from "@/shared/ui/ui-input/ui-input";
import { UiTypography } from "@/shared/ui/ui-typography";

import { useChangeSettingsMutation } from "../api/change-settings-api";
import type { SettingsFormSchemaType } from "../model/types";

import styles from "./change-settings.module.scss";

type TProps = {
  firstName?: string;
  lastName?: string;
  login?: string;
  email?: string;
  className?: string;
};

const ChangeSettingsForm = ({
  firstName,
  lastName,
  login,
  email,
  className,
}: TProps) => {
  const { handleSubmit, register, ...rest } = useForm<SettingsFormSchemaType>({
    defaultValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
    },
  });
  const [changeSettingsMutation] = useChangeSettingsMutation();

  const handleUpdateSettings = handleSubmit(async ({ firstName, lastName }) => {
    try {
      await changeSettingsMutation({ firstName, lastName });
      showNotification({
        title: "Изменения сохранены",
        variant: "success",
      });
    } catch {
      showNotification({
        title: "Ошибка сервера.",
        text: "Попробуйте немного позже",
        variant: "error",
      });
    }
  });

  return (
    <FormProvider {...{ ...rest, handleSubmit, register }}>
      <form className={cn(styles.form, className)}>
        <UiInput
          label="Имя"
          placeholder="Ваше имя"
          {...register("firstName")}
        />
        <UiInput
          label="Фамилия"
          placeholder="Ваша фамилия"
          {...register("lastName")}
        />
        <UiInput
          name="email"
          label="e-mail"
          placeholder="Ваш e-mail"
          disabled
          defaultValue={email}
        />
        <UiInput
          name="login"
          label="Логин"
          placeholder="Ваш логин"
          disabled
          defaultValue={login}
        />
      </form>

      <UiButton color="secondary" onClick={handleUpdateSettings}>
        <UiTypography variant="lg" fontWeight="semibold" color="white">
          Сохранить изменения
        </UiTypography>
      </UiButton>
    </FormProvider>
  );
};

export default ChangeSettingsForm;
