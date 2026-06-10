import { type ChangeEvent, type FC, useState } from "react";
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
  const [noteText, setNoteText] = useState("");
  const [createNote] = useCreateNoteMutation();
  const noteLength = noteText.length;
  const remainingChars = MAX_NOTE_LENGTH - noteLength;
  const isLimitExceeded = remainingChars < 0;

  const counterText = `(${remainingChars})`;

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.target.value);
  };

  const handleCreateNote = async () => {
    try {
      await createNote({ text: noteText }).unwrap();
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
    }
    setNoteText("");
    onClose();
  };

  return (
    <UiDrawer isOpen={isOpen} onClose={onClose} title="Новая заметка">
      <div className={styles.content}>
        <div className={styles.textareaWrap}>
          <UiTextarea
            value={noteText}
            onChange={handleNoteChange}
            placeholder="максимально 160 символов"
            rows={5}
            minLength={10}
            error={isLimitExceeded}
            className={styles.textarea}
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
