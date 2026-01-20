import { useCallback, useEffect, useRef, useState } from "react";

import { useForgotPasswordMutation } from "@/entities/auth";
import type { ForgotPasswordDto } from "@/entities/auth/model/types.ts";

import { HttpStatus } from "@/shared/api/http-status.ts";
import { matchHttpError } from "@/shared/api/match-http-error.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";

export const useForgotPassword = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [forgotPassword, { isSuccess, error }] = useForgotPasswordMutation();
  const emailRef = useRef<ForgotPasswordDto | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setShowForgotPasswordModal(false);
      setShowOtpModal(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!error) return;

    matchHttpError(error, {
      [HttpStatus.FORBIDDEN]: () => {
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
  }, [error]);

  const handleForgotPasswordClick = useCallback(
    (email: ForgotPasswordDto) => {
      emailRef.current = email;
      forgotPassword(email);
    },
    [forgotPassword],
  );

  const handleCloseForgotModal = useCallback(() => {
    setShowForgotPasswordModal(false);
  }, []);

  const handleOpenForgotModal = useCallback(() => {
    setShowForgotPasswordModal(true);
  }, []);

  const handleCloseOtpModal = useCallback(() => {
    setShowOtpModal(false);
  }, []);

  return {
    verificationEmail: emailRef.current?.email,
    showOtpModal,
    showForgotPasswordModal,
    handleForgotPasswordClick,
    handleOpenForgotModal,
    handleCloseForgotModal,
    handleCloseOtpModal,
  };
};
