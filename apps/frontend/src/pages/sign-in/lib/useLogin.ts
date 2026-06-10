import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

import type { LoginFormType } from "@/features/login";

import { useLoginMutation } from "@/entities/auth";

import { HttpStatus } from "@/shared/api/http-status";
import { isFetchBaseQueryError } from "@/shared/api/is-query-error";
import { matchHttpError } from "@/shared/api/match-http-error";
import { ModalTypes } from "@/shared/config/modal-types.ts";
import { ROUTE_PATHS } from "@/shared/config/route-paths";
import { showNotification } from "@/shared/lib/show-notification";
import { useModal } from "@/shared/lib/use-modal.ts";

export const useLogin = () => {
  const { handleOpenModal } = useModal();
  const [login, { error, originalArgs }] = useLoginMutation();
  const navigate = useNavigate();

  const isServerValidationError = useMemo(() => {
    return (
      isFetchBaseQueryError(error) && error.status === HttpStatus.UNAUTHORIZED
    );
  }, [error]);

  const loginQuery = useCallback(
    async (credentials: LoginFormType) => {
      try {
        await login(credentials).unwrap();
        navigate(ROUTE_PATHS.HOME);
      } catch (error) {
        matchHttpError(error, {
          [HttpStatus.UNAUTHORIZED]: (message) => {
            showNotification({
              title: message,
              text: "Попробуйте снова.",
              variant: "error",
            });
          },
          [HttpStatus.FORBIDDEN]: (message) => {
            showNotification({
              title: message,
              text: "Проверьте почту и перейдите по ссылке.",
              variant: "error",
            });
          },
          default: () => {
            handleOpenModal(ModalTypes.LOGIN_ERROR);
          },
        });
      }
    },
    [login, navigate, handleOpenModal],
  );

  const handleLogin = useCallback(
    (credentials: LoginFormType) => {
      loginQuery(credentials);
    },
    [loginQuery],
  );
  const handleRetry = useCallback(() => {
    if (originalArgs) {
      loginQuery(originalArgs);
    }
  }, [loginQuery, originalArgs]);

  return {
    isServerValidationError,
    handleRetry,
    handleLogin,
  };
};
