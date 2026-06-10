import { type FC, useCallback } from "react";

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
  const [register, { originalArgs }] = useRegisterMutation();

  const handleRegistration = useCallback(
    async (credentials: RegisterFormType) => {
      try {
        await register(credentials).unwrap();
        handleOpenModal(ModalTypes.EMAIL_CONFIRMATION);
      } catch (error) {
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
      }
      register(credentials);
    },
    [register, handleOpenModal],
  );

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
