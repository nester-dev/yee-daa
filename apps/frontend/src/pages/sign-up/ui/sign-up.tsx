import { type FC, useCallback, useEffect } from "react";

import {
  EmailConfirmationModal,
  RegisterForm,
  type RegisterFormType,
} from "@/features/register";

import { useRegisterMutation } from "@/entities/auth";

import { HttpStatus } from "@/shared/api/http-status.ts";
import { matchHttpError } from "@/shared/api/match-http-error.ts";
import { ModalTypes } from "@/shared/config/modal-types.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";
import { useModal } from "@/shared/lib/use-modal.ts";

const SignUp: FC = () => {
  const { handleOpenModal } = useModal();
  const [register, { isSuccess, error, originalArgs }] = useRegisterMutation();

  const handleRegistration = useCallback(
    (credentials: RegisterFormType) => {
      register(credentials);
    },
    [register],
  );

  useEffect(() => {
    if (isSuccess) {
      handleOpenModal(ModalTypes.EMAIL_CONFIRMATION);
    }
  }, [isSuccess, handleOpenModal]);

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
        modalType={ModalTypes.EMAIL_CONFIRMATION}
        email={originalArgs?.email}
      />
    </>
  );
};

export default SignUp;
