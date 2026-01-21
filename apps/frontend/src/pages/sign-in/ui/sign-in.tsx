import { type FC } from "react";

import {
  AccountRecoveryModal,
  useAccountRecovery,
} from "@/widgets/account-recovery";

import { LoginErrorModal, LoginForm } from "@/features/login";
import { OtpVerificationModal } from "@/features/otp-verification";
import { PasswordForgotModal } from "@/features/password-forgot";

import { ModalTypes } from "@/shared/config/modal-types.ts";
import { useModal } from "@/shared/lib/use-modal.ts";

import { useForgotPassword } from "../lib/useForgotPassword.ts";
import { useLogin } from "../lib/useLogin.ts";
import { useVerifyOpt } from "../lib/useVerifyOpt.ts";

const SignIn: FC = () => {
  const { handleOpenModal, handleCloseModal } = useModal();
  const { isServerValidationError, handleRetry, handleLogin } = useLogin();
  const { verificationEmail, handleForgotPasswordClick } = useForgotPassword();
  const { isVerifyError, handleVerifyOtp } = useVerifyOpt();
  const { handleRecovery } = useAccountRecovery();

  return (
    <>
      <LoginForm
        isServerValidationError={isServerValidationError}
        onLogin={handleLogin}
        onForgotPasswordClick={() =>
          handleOpenModal(ModalTypes.PASSWORD_FORGOT)
        }
      />
      <LoginErrorModal
        modalType={ModalTypes.LOGIN_ERROR}
        onRetry={handleRetry}
      />
      <PasswordForgotModal
        modalType={ModalTypes.PASSWORD_FORGOT}
        onConfirmClick={handleForgotPasswordClick}
      />
      <OtpVerificationModal
        modalType={ModalTypes.OTP_VERIFICATION}
        email={verificationEmail}
        isVerifyError={isVerifyError}
        onVerify={handleVerifyOtp}
      />

      <AccountRecoveryModal
        email={verificationEmail}
        onClose={handleCloseModal}
        modalType={ModalTypes.ACCOUNT_RECOVERY}
        onRecovery={handleRecovery}
      />
    </>
  );
};

export default SignIn;
