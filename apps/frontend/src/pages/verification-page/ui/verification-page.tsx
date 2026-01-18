import { type FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { RegisterForm } from "@/features/register";

import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { showNotification } from "@/shared/lib/show-notification.tsx";

import VerificationModal from "./verification-modal.tsx";

const VerificationPage: FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const emailVerified = params.get("emailVerified");
  const isSuccess = emailVerified === "true";
  const isFailure = emailVerified === "false";

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "Верификация прошла успешно",
        variant: "success",
      });
      navigate(ROUTE_PATHS.SIGN_IN, { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <RegisterForm onRegistration={() => {}} />
      <VerificationModal
        isOpen={isFailure}
        onClose={() => navigate(ROUTE_PATHS.SIGN_UP, { replace: true })}
      />
    </>
  );
};

export default VerificationPage;
