import { type FC, useCallback, useEffect, useState } from "react";

import {
  EmailConfirmationModal,
  RegisterForm,
  type RegisterFormType,
} from "@/features/register";

import { useRegisterMutation } from "@/entities/auth";

import { HttpStatus } from "@/shared/api/http-status.ts";
import { matchHttpError } from "@/shared/api/match-http-error.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";

const SignUp: FC = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [register, { isSuccess, error, originalArgs }] = useRegisterMutation();

  const handleRegistration = useCallback(
    (credentials: RegisterFormType) => {
      register(credentials);
    },
    [register],
  );

  useEffect(() => {
    if (isSuccess) {
      setShowConfirmationModal(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    matchHttpError(error, {
      [HttpStatus.BAD_REQUEST]: (message) => {
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

  return (
    <>
      <RegisterForm onRegistration={handleRegistration} />
      <EmailConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        email={originalArgs?.email}
      />
    </>
  );
};

export default SignUp;
