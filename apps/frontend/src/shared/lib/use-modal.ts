import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { type ModalTypes } from "@/shared/config/modal-types.ts";

export const useModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOpenModal = useCallback(
    (modalType: ModalTypes) => {
      setSearchParams({ modal: modalType as unknown as string });
    },
    [setSearchParams],
  );

  const handleCloseModal = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const getIsModalOpen = useCallback(
    (modalType?: ModalTypes | null) => {
      return searchParams.get("modal") === modalType;
    },
    [searchParams],
  );

  return {
    getIsModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
