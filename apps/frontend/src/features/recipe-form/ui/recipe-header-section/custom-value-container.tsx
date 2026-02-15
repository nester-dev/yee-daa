import { Children, isValidElement, type ReactNode } from "react";
import { components, type ValueContainerProps } from "react-select";
import cn from "clsx";

import { useMediaQuery } from "@/shared/lib/use-media-query.ts";

import styles from "./recipe-header-section.module.scss";

export const CustomValueContainer = (
  props: ValueContainerProps<unknown, true>,
) => {
  const isDesktopDevice = useMediaQuery("(max-width: 1440px)");
  const { children, getValue, hasValue } = props;
  const selectedOptions = getValue();
  const optionsCount = selectedOptions.length;
  const maxVisible = isDesktopDevice ? 1 : 2;

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
