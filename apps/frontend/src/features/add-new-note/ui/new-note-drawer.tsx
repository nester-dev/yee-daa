import { type FC } from "react";
import { useForm } from "react-hook-form";
import cn from "clsx";

import { useCreateNoteMutation } from "@/entities/user";

import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button";
import type { UiDrawerProps } from "@/shared/ui/ui-drawer/ui-drawer";
import UiDrawer from "@/shared/ui/ui-drawer/ui-drawer";
import UiTextarea from "@/shared/ui/ui-textarea/ui-textarea";
import UiTypography from "@/shared/ui/ui-typography/ui-typography";

import styles from "./new-note-drawer.module.scss";

const MAX_NOTE_LENGTH = 160;

const NewNoteDrawer: FC<UiDrawerProps> = ({ isOpen, onClose }) => {
  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<{ text: string }>({
    defaultValues: {
      text: "",
    },
  });
  const noteText = watch("text");
  const [createNote] = useCreateNoteMutation();
  const noteLength = noteText.length;
  const remainingChars = MAX_NOTE_LENGTH - noteLength;
  const isLimitExceeded = remainingChars < 0;

  const counterText = `(${remainingChars})`;

  const handleCreateNote = handleSubmit(async ({ text }) => {
    try {
      await createNote({ text }).unwrap();
      showNotification({
        title: "Заметка опубликована",
        variant: "success",
      });
    } catch {
      showNotification({
        title: "Ошибка сервера.",
        text: "Попробуйте немного позже",
        variant: "error",
      });
    } finally {
      reset();
      onClose();
    }
  });

  return (
    <UiDrawer isOpen={isOpen} onClose={onClose} title="Новая заметка">
      <div className={styles.content}>
        <div className={styles.textareaWrap}>
          <UiTextarea
            placeholder="максимально 160 символов"
            rows={5}
            minLength={10}
            className={styles.textarea}
            {...register("text", {
              required: "Введите заметку",
              minLength: {
                value: 10,
                message: "Минимальная длина 10 символов",
              },
            })}
            error={!!errors.text?.message}
          />
          <span
            className={cn(
              styles.counter,
              isLimitExceeded && styles["counter-error"],
            )}
          >
            {counterText}
          </span>
        </div>
        <UiButton
          color="secondary"
          disabled={isLimitExceeded}
          onClick={handleCreateNote}
        >
          <UiTypography variant="lg" fontWeight="semibold" color="white">
            Опубликовать
          </UiTypography>
        </UiButton>
      </div>
    </UiDrawer>
  );
};

export default NewNoteDrawer;
