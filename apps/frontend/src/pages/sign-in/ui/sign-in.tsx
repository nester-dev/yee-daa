import { type FC, useCallback } from "react";
import { useNavigate } from "react-router";

import {
  LoginErrorModal,
  LoginForm,
  type LoginFormType,
} from "@/features/login";

import { useLoginMutation } from "@/entities/auth";

import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { isServerError } from "@/shared/lib/is-server-error.ts";

const SignIn: FC = () => {
  const [login, { isSuccess, error, reset, originalArgs }] = useLoginMutation();
  const navigate = useNavigate();

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
      <LoginForm onLogin={handleLogin} />
      <LoginErrorModal
        isOpen={isServerError(error)}
        onRetry={handleRetry}
        onClose={reset}
      />
    </>
  );
};

export default SignIn;
