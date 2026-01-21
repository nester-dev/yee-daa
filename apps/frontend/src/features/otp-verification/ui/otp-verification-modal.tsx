import { type FC, useEffect, useState } from "react";
import cn from "clsx";
import { OTPInput } from "input-otp";

import type { VerifyOtpDto } from "@/entities/auth/model/types.ts";

import OtpImage from "@/shared/assets/img/user-with-tablet.png";
import UiModal, { type ModalProps } from "@/shared/ui/ui-modal/ui-modal.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./otp-verification.module.scss";

type Props = Pick<ModalProps, "isOpen" | "onClose"> & {
  email?: string;
  isVerifyError: boolean;
  onVerify: (data: VerifyOtpDto) => void;
};

const OtpVerificationModal: FC<Props> = ({
  isOpen,
  onClose,
  email,
  isVerifyError,
  onVerify,
}) => {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.verification}
      header={
        <img
          src={OtpImage}
          className={styles["verification-image"]}
          alt="user-with-tablet"
        />
      }
      content={
        <VerificationContent
          email={email}
          isVerifyError={isVerifyError}
          onVerify={onVerify}
        />
      }
      footer={
        <UiTypography
          className={styles["verification-notice"]}
          variant="xs"
          align="center"
        >
          Не пришло письмо? Проверьте папку Спам.
        </UiTypography>
      }
    />
  );
};

const VerificationContent: FC<
  Pick<Props, "email" | "isVerifyError" | "onVerify">
> = ({ email, isVerifyError, onVerify }) => {
  const [otpToken, setOtpToken] = useState("");

  useEffect(() => {
    if (isVerifyError) {
      setOtpToken("");
    }
  }, [isVerifyError]);

  return (
    <div className={styles["verification-content"]}>
      <UiTypography align="center">
        Мы отправили вам на e-mail{"\n"}
        <span className={styles["verification-email"]}>{email}</span>
        {"\n"}
        шестизначный код. Введите его ниже.
      </UiTypography>
      <OTPInput
        maxLength={6}
        value={otpToken}
        onChange={setOtpToken}
        containerClassName={styles.otp}
        onComplete={(otp) => onVerify({ email: email!, otpToken: otp })}
        render={({ slots }) => (
          <>
            <div className={styles["otp-content"]}>
              {slots.map((slot, idx) => (
                <div
                  className={cn(
                    styles["otp-slot"],
                    slot.isActive &&
                      !isVerifyError &&
                      styles["otp-slot--active"],
                    !slot.char && styles["otp-slot--empty"],
                    isVerifyError && styles["otp-slot--error"],
                  )}
                  key={idx}
                >
                  {slot.char ?? slot.placeholderChar}
                </div>
              ))}
            </div>
          </>
        )}
      />
    </div>
  );
};

export { OtpVerificationModal };
