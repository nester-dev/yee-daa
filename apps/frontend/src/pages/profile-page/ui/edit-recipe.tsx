import type { FC } from "react";

import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

type TProps = {
  isDraft: boolean;
  className?: string;
};

const EditRecipeButton: FC<TProps> = ({ isDraft, className }) => {
  return (
    <UiButton
      size="sm"
      color={isDraft ? "secondary" : "primary"}
      className={className}
    >
      <UiTypography
        color={isDraft ? "white" : "black"}
        variant="sm"
        fontWeight="semibold"
      >
        Редактировать
      </UiTypography>
    </UiButton>
  );
};

export default EditRecipeButton;
