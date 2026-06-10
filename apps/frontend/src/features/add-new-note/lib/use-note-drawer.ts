import { useCallback, useState } from "react";

export const useNoteDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNoteDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const openNoteDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { isOpen, toggleNoteDrawer, openNoteDrawer };
};
