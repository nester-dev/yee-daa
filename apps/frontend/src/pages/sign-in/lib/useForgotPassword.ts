import { useCallback, useRef } from "react";

import { useForgotPasswordMutation } from "@/entities/auth";
import type { ForgotPasswordDto } from "@/entities/auth/model/types.ts";

import { HttpStatus } from "@/shared/api/http-status.ts";
import { matchHttpError } from "@/shared/api/match-http-error.ts";
import { ModalTypes } from "@/shared/config/modal-types.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";
import { useModal } from "@/shared/lib/use-modal.ts";

export const useForgotPassword = () => {
  const { handleOpenModal } = useModal();
  const [forgotPassword] = useForgotPasswordMutation();
  const emailRef = useRef<ForgotPasswordDto | null>(null);

  const handleForgotPasswordClick = useCallback(
    async (email: ForgotPasswordDto) => {
      emailRef.current = email;
      try {
        await forgotPassword(email).unwrap();
        handleOpenModal(ModalTypes.OTP_VERIFICATION);
      } catch (error) {
        matchHttpError(error, {
          [HttpStatus.BAD_REQUEST]: (message) => {
            showNotification({
              title: message,
              variant: "error",
            });
          },
          [HttpStatus.NOT_FOUND]: () => {
            showNotification({
              title: "Такого email нет",
              text: "Попробуйте другой e-mail или проверьте правильность его написания",
              variant: "error",
            });
          },

          default: () => {
            showNotification({
              title: "Ошибка сервера",
              text: "Попробуйте немного позже",
              variant: "error",
            });
          },
        });
      }
    },
    [forgotPassword, handleOpenModal],
  );

  return {
    verificationEmail: emailRef.current?.email,
    handleForgotPasswordClick,
  };
};
