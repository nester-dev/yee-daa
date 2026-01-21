import { type FC, useState } from "react";

import type { ForgotPasswordDto } from "@/entities/auth/model/types.ts";

import ForgotPasswordImage from "@/shared/assets/img/food-illustration.png";
import { validateForm } from "@/shared/lib/validate-form.ts";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";
import UiModal, { type ModalProps } from "@/shared/ui/ui-modal/ui-modal.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import {
  PasswordForgotSchema,
  type PasswordForgotType,
} from "../model/password-forgot-schema.ts";

import styles from "./password-forgot.module.scss";

type Props = Pick<ModalProps, "modalType" | "onClose"> & {
  onConfirmClick: (email: ForgotPasswordDto) => void;
};

const PasswordForgotModal: FC<Props> = ({
  modalType,
  onClose,
  onConfirmClick,
}) => {
  return (
    <UiModal
      className={styles["password-forgot"]}
      modalType={modalType}
      onClose={onClose}
      header={
        <img
          className={styles["password-forgot-image"]}
          src={ForgotPasswordImage}
          alt="forgot-password-image"
        />
      }
      content={<PasswordForgotContent onConfirmClick={onConfirmClick} />}
      footer={
        <UiTypography className={styles["password-forgot-notice"]} variant="xs">
          Не пришло письмо? Проверьте папку Спам.
        </UiTypography>
      }
    />
  );
};

const PasswordForgotContent: FC<Pick<Props, "onConfirmClick">> = ({
  onConfirmClick,
}) => {
  const [data, setData] = useState<PasswordForgotType>({
    email: "",
  });
  const [showErrors, setShowErrors] = useState(false);

  const errors = showErrors
    ? validateForm(PasswordForgotSchema, data)
    : undefined;

  const handleConfirm = () => {
    const errors = validateForm(PasswordForgotSchema, data);

    if (errors) {
      setShowErrors(true);
      return;
    }

    onConfirmClick(data);
  };

  return (
    <div className={styles["password-forgot-content"]}>
      <UiTypography color="blackOverlay" align="center">
        {
          "Для восстановления входа введите\nваш e-mail, куда можно отправить уникальный код"
        }
      </UiTypography>

      <UiInput
        name="email"
        label="Ваш e-mail"
        placeholder="e-mail"
        value={data.email}
        onChange={(e) =>
          setData({
            email: e.target.value,
          })
        }
        error={errors?.email?.at(0)}
      />

      <UiButton
        color="secondary"
        className={styles["password-forgot-button"]}
        onClick={handleConfirm}
      >
        <UiTypography
          color="white"
          fontWeight="semibold"
          variant="lg"
          align="center"
        >
          Получить код
        </UiTypography>
      </UiButton>
    </div>
  );
};

export default PasswordForgotModal;
