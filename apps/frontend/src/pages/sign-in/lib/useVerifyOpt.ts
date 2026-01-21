import { useCallback, useEffect, useState } from "react";

import { useVerifyOtpMutation } from "@/entities/auth";
import type { VerifyOtpDto } from "@/entities/auth/model/types.ts";

import { HttpStatus } from "@/shared/api/http-status.ts";
import { matchHttpError } from "@/shared/api/match-http-error.ts";
import { ModalTypes } from "@/shared/config/modal-types.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";
import { useModal } from "@/shared/lib/use-modal.ts";

export const useVerifyOpt = () => {
  const [verifyOtp, { isSuccess, error }] = useVerifyOtpMutation();
  const { handleOpenModal } = useModal();
  const [isVerifyError, setIsVerifyError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      handleOpenModal(ModalTypes.ACCOUNT_RECOVERY);
    }
  }, [isSuccess, handleOpenModal]);

  useEffect(() => {
    matchHttpError(error, {
      [HttpStatus.FORBIDDEN]: () => {
        setIsVerifyError(true);
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

  const handleVerifyOtp = useCallback(
    (data: VerifyOtpDto) => {
      setIsVerifyError(false);
      verifyOtp(data);
    },
    [verifyOtp],
  );

  return {
    isVerifyError,
    handleVerifyOtp,
  };
};
