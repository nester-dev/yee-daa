import type { TabItem, TabValue } from "@/shared/ui/ui-tabs/ui-tab-item.tsx";

const equalInitValue = (initialValue?: TabValue) => (tab: TabItem) =>
  tab.value === initialValue;

export const getInitActiveTabIndex = (
  tabs: TabItem[],
  initialValue?: TabValue,
) => {
  const index = tabs.findIndex(equalInitValue(initialValue));

  return initialValue && index !== -1 ? index : 0;
};

export const getIndicatorStyles = (width: number, left: number) => ({
  transform: `translate(${left}px, 0px)`,
  width,
});
