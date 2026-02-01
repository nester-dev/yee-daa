import { useCallback, useState } from "react";

export const useFilterDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFiltersDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    toggleFiltersDrawer,
  };
};
