import type { FC } from "react";

import { useDeleteNoteMutation } from "@/entities/user";

import TrashIcon from "@/shared/assets/icons/trash-icon.svg?react";
import { showNotification } from "@/shared/lib/show-notification";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button";

type Props = {
  noteId: string;
};

const DeleteNoteButton: FC<Props> = ({ noteId }) => {
  const [deleteNote] = useDeleteNoteMutation();

  const handleDeleteNote = async () => {
    try {
      await deleteNote(noteId).unwrap();
      showNotification({
        title: "Заметка удалена",
        variant: "success",
      });
    } catch {
      showNotification({
        title: "Ошибка сервера.",
        text: "Попробуйте позже",
        variant: "error",
      });
    }
  };

  return (
    <UiIconButton size="inherit" onClick={handleDeleteNote}>
      <TrashIcon />
    </UiIconButton>
  );
};

export default DeleteNoteButton;
