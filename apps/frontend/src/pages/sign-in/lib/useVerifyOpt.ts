import { useCallback, useEffect, useState } from "react";

import { useVerifyOtpMutation } from "@/entities/auth";
import type { VerifyOtpDto } from "@/entities/auth/model/types.ts";

import { HttpStatus } from "@/shared/api/http-status.ts";
import { matchHttpError } from "@/shared/api/match-http-error.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";

export const useVerifyOpt = () => {
  const [verifyOtp, { error }] = useVerifyOtpMutation();
  const [isVerifyError, setIsVerifyError] = useState<boolean>(false);

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
