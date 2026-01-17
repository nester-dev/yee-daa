import { type FC, useCallback, useEffect } from "react";

import { RegisterForm, type RegisterFormType } from "@/features/register";

import { useRegisterMutation } from "@/entities/auth";

import { showNotification } from "@/shared/lib/show-notification.tsx";

const SignUp: FC = () => {
  const [register, { isError }] = useRegisterMutation();

  const handleRegistration = useCallback(
    (credentials: RegisterFormType) => {
      register(credentials);
    },
    [register],
  );

  useEffect(() => {
    if (isError) {
      showNotification({
        title: "Ошибка сервера",
        text: "Попробуйте немного позже",
        variant: "error",
      });
    }
  }, [isError]);

  return (
    <>
      <RegisterForm onRegistration={handleRegistration} />
    </>
  );
};

export default SignUp;
