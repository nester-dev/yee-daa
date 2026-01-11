import { type FC, useCallback } from "react";

import {
  LoginErrorModal,
  LoginForm,
  type LoginFormType,
} from "@/features/login";

import { useLoginMutation } from "@/entities/auth";

import { isServerError } from "@/shared/lib/is-server-error.ts";

const SignIn: FC = () => {
  const [login, { error, reset, originalArgs }] = useLoginMutation();

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
