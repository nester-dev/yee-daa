import { type FC } from "react";

import { LoginErrorModal, LoginForm } from "@/features/login";
import { OtpVerificationModal } from "@/features/otp-verification";
import { PasswordForgotModal } from "@/features/password-forgot";

import { useForgotPassword } from "../lib/useForgotPassword.ts";
import { useLogin } from "../lib/useLogin.ts";

const SignIn: FC = () => {
  const {
    isServerValidationError,
    showErrorModal,
    handleCloseErrorModal,
    handleRetry,
    handleLogin,
  } = useLogin();
  const {
    verificationEmail,
    showOtpModal,
    showForgotPasswordModal,
    handleForgotPasswordClick,
    handleOpenForgotModal,
    handleCloseForgotModal,
    handleCloseOtpModal,
  } = useForgotPassword();

  console.log(verificationEmail);

  return (
    <>
      <LoginForm
        isServerValidationError={isServerValidationError}
        onLogin={handleLogin}
        onForgotPasswordClick={handleOpenForgotModal}
      />
      <LoginErrorModal
        isOpen={showErrorModal}
        onRetry={handleRetry}
        onClose={handleCloseErrorModal}
      />
      <PasswordForgotModal
        isOpen={showForgotPasswordModal}
        onClose={handleCloseForgotModal}
        onConfirmClick={handleForgotPasswordClick}
      />
      <OtpVerificationModal
        email={verificationEmail}
        isOpen={showOtpModal}
        onClose={handleCloseOtpModal}
      />
    </>
  );
};

export default SignIn;
