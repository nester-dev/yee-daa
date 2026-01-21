import { type ChangeEvent, type FC, useState } from "react";

import {
  Credentials,
  type CredentialsFormType,
  CredentialsSchema,
} from "@/features/register";

import type { AccountRecoveryDto } from "@/entities/auth/model/types.ts";

import { validateForm } from "@/shared/lib/validate-form.ts";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import UiModal, { type ModalProps } from "@/shared/ui/ui-modal/ui-modal.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./account-recovery.module.scss";

type Props = Pick<ModalProps, "isOpen" | "onClose"> & {
  email?: string;
  onRecovery: (data: AccountRecoveryDto) => void;
};

const AccountRecoveryModal: FC<Props> = ({
  isOpen,
  onClose,
  onRecovery,
  email,
}) => {
  const [formData, setFormData] = useState<CredentialsFormType>({
    login: "",
    password: "",
    confirmPassword: "",
  });
  const [showErrors, setShowErrors] = useState(false);

  const errors = showErrors
    ? validateForm(CredentialsSchema, formData)
    : undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecovery = () => {
    const errors = validateForm(CredentialsSchema, formData);

    if (errors) {
      setShowErrors(true);
      return;
    }

    if (!email) {
      return;
    }

    onRecovery({
      email,
      login: formData.login,
      password: formData.password,
      passwordConfirm: formData.confirmPassword,
    });
  };

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.recovery}
      header={
        <UiTypography variant="xxl" fontWeight="bold" align="center">
          {"Восстановление\nаккаунта"}
        </UiTypography>
      }
      content={
        <Credentials
          login={formData.login}
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          onChange={handleChange}
          errors={errors}
        />
      }
      footer={
        <UiButton variant="solid" color="secondary" onClick={handleRecovery}>
          <UiTypography variant="lg" color="white" fontWeight="semibold">
            Зарегистрироваться
          </UiTypography>
        </UiButton>
      }
    />
  );
};

export default AccountRecoveryModal;
