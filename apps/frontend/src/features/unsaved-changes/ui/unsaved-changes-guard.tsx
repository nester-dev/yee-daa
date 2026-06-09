import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { useBeforeUnload, useBlocker } from "react-router";

import PencilIcon from "@/shared/assets/icons/pencil-icon.svg?react";
import ImagePlaceholder from "@/shared/assets/img/food-illustration.png";
import UiButton from "@/shared/ui/ui-button/ui-button";
import UiModal from "@/shared/ui/ui-modal/ui-modal";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./unsaved-changes-guard.module.scss";

type Props = {
  isDirty: boolean;
  onSaveDraft: () => Promise<boolean>;
};

const UnsavedChangesGuard: FC<Props> = ({ isDirty, onSaveDraft }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shouldBlockNavigation = useCallback(() => isDirty, [isDirty]);
  const blocker = useBlocker(shouldBlockNavigation);

  useBeforeUnload(
    useCallback(
      (event) => {
        if (!isDirty) return;

        event.preventDefault();
        event.returnValue = "";
      },
      [isDirty],
    ),
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      setIsOpen(true);
    }
  }, [blocker.state]);

  const closeAndStay = useCallback(() => {
    setIsOpen(false);
    if (blocker.state === "blocked") {
      blocker.reset();
    }
  }, [blocker]);

  const leaveWithoutSaving = useCallback(() => {
    setIsOpen(false);
    if (blocker.state === "blocked") {
      blocker.proceed();
    }
  }, [blocker]);

  const saveDraftAndLeave = useCallback(async () => {
    let isSaved = false;

    try {
      isSaved = await onSaveDraft();
    } catch {
      isSaved = false;
    }

    setIsOpen(false);

    if (blocker.state !== "blocked") {
      return;
    }

    if (isSaved) {
      blocker.proceed();
      return;
    }

    blocker.reset();
  }, [blocker, onSaveDraft]);

  const footer = useMemo(
    () => (
      <div className={styles.actions}>
        <UiButton
          color="secondary"
          onClick={saveDraftAndLeave}
          icon={<PencilIcon className={styles.icon} />}
        >
          <UiTypography variant="lg" color="white" fontWeight="semibold">
            Сохранить черновик
          </UiTypography>
        </UiButton>
        <UiButton variant="outlined" onClick={leaveWithoutSaving}>
          <UiTypography variant="lg" fontWeight="semibold">
            Выйти без сохранения
          </UiTypography>
        </UiButton>
      </div>
    ),
    [leaveWithoutSaving, saveDraftAndLeave],
  );

  return (
    <UiModal
      isOpen={isOpen}
      onClose={closeAndStay}
      className={styles.modal}
      header={
        <img
          className={styles.image}
          src={ImagePlaceholder}
          alt="food-placeholder"
        />
      }
      content={
        <div className={styles.content}>
          <UiTypography variant="xxl" fontWeight="bold" align="center">
            Выйти без сохранения?
          </UiTypography>
          <UiTypography color="blackOverlay" align="center">
            Чтобы сохранить, нажмите кнопку сохранить черновик
          </UiTypography>
        </div>
      }
      footer={footer}
    />
  );
};

export default UnsavedChangesGuard;
