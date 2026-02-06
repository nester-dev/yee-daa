import { Children, isValidElement, type ReactNode } from "react";
import { components, type ValueContainerProps } from "react-select";
import cn from "clsx";

import styles from "./recipe-header-section.module.scss";

export const CustomValueContainer = (
  props: ValueContainerProps<unknown, true>,
) => {
  const { children, getValue, hasValue } = props;
  const selectedOptions = getValue();
  const optionsCount = selectedOptions.length;
  const maxVisible = 2;

  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }

  const childrenArray = Children.toArray(children);

  const { multiValues, otherChildren } = childrenArray.reduce<{
    multiValues: ReactNode[];
    otherChildren: ReactNode[];
  }>(
    (acc, child) => {
      if (isValidElement(child) && child.type === components.MultiValue) {
        acc.multiValues.push(child);
      } else {
        acc.otherChildren.push(child);
      }

      return acc;
    },
    { multiValues: [], otherChildren: [] },
  );

  return (
    <components.ValueContainer {...props} className={styles["value-container"]}>
      {multiValues.slice(0, maxVisible)}

      {optionsCount > maxVisible && (
        <span className="primary__multi-value" style={{ margin: "0 1px" }}>
          <div className={cn("primary__multi-value__label", styles.option)}>
            +{optionsCount - maxVisible}
          </div>
        </span>
      )}

      {otherChildren}
    </components.ValueContainer>
  );
};
