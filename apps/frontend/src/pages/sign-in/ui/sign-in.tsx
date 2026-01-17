import { type FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

import {
  LoginErrorModal,
  LoginForm,
  type LoginFormType,
} from "@/features/login";

import { useLoginMutation } from "@/entities/auth";

import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { isServerError } from "@/shared/lib/is-server-error.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";

const SignIn: FC = () => {
  const [login, { isSuccess, isError, error, reset, originalArgs }] =
    useLoginMutation();
  const navigate = useNavigate();

  const isInternalServerError = isServerError(error);
  const isServerValidationError = isError && !isInternalServerError;

  useEffect(() => {
    if (isServerValidationError) {
      showNotification({
        title: "Неверный логин или пароль",
        text: "Попробуйте снова.",
        variant: "error",
      });
    }
  }, [isServerValidationError]);

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
        isOpen={isInternalServerError}
        onRetry={handleRetry}
        onClose={reset}
      />
    </>
  );
};

export default SignIn;
