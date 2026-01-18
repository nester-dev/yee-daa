import { type FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  LoginErrorModal,
  LoginForm,
  type LoginFormType,
} from "@/features/login";

import { useLoginMutation } from "@/entities/auth";

import { HttpStatus } from "@/shared/api/http-status.ts";
import { isFetchBaseQueryError } from "@/shared/api/is-query-error.ts";
import { matchHttpError } from "@/shared/api/match-http-error.ts";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";

const SignIn: FC = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [login, { isSuccess, error, originalArgs }] = useLoginMutation();
  const navigate = useNavigate();

  const isServerValidationError =
    isFetchBaseQueryError(error) && error.status === HttpStatus.UNAUTHORIZED;

  useEffect(() => {
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
        setShowErrorModal(true);
      },
    });
  }, [error]);

  if (isSuccess) {
    navigate(ROUTE_PATHS.HOME);
  }

  const handleLogin = useCallback(
    (credentials: LoginFormType) => {
      login(credentials);
    },
    [login],
  );

  const handleRetry = useCallback(() => {
    if (originalArgs) {
      login(originalArgs);
    }
  }, [login, originalArgs]);

  return (
    <>
      <LoginForm
        onLogin={handleLogin}
        isServerValidationError={isServerValidationError}
      />
      <LoginErrorModal
        isOpen={showErrorModal}
        onRetry={handleRetry}
        onClose={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default SignIn;
