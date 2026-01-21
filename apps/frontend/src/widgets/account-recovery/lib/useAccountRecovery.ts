import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

import { useResetPasswordMutation } from "@/entities/auth";
import type { AccountRecoveryDto } from "@/entities/auth/model/types.ts";

import { HttpStatus } from "@/shared/api/http-status.ts";
import { matchHttpError } from "@/shared/api/match-http-error.ts";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";

export const useAccountRecovery = () => {
  const [resetPassword, { isSuccess, error }] = useResetPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTE_PATHS.HOME, { replace: true });
      showNotification({
        title: "Восстановление данных успешно",
        variant: "success",
      });
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    matchHttpError(error, {
      [HttpStatus.BAD_REQUEST]: (message) => {
        showNotification({
          title: message,
          variant: "error",
        });
      },
      [HttpStatus.FORBIDDEN]: (message) => {
        showNotification({
          title: message,
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

  const handleRecovery = useCallback(
    (data: AccountRecoveryDto) => {
      resetPassword(data);
    },
    [resetPassword],
  );

  return {
    handleRecovery,
  };
};
