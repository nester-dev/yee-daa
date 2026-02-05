import type { FC } from "react";
import { components, type OptionProps } from "react-select";

import UiCheckbox from "@/shared/ui/ui-checkbox/ui-checkbox.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

const UiCheckboxOption: FC<OptionProps> = (props) => {
  return (
    <components.Option {...props}>
      <label htmlFor={props.label}>
        <UiCheckbox checked={props.isSelected} id={props.label} readOnly />
      </label>
      <UiTypography variant="sm" fontWeight="medium">
        {props.label}
      </UiTypography>
    </components.Option>
  );
};

export default UiCheckboxOption;
