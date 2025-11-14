import { type FC, useEffect, useRef, useState } from "react";

import {
  getIndicatorStyles,
  getInitActiveTabIndex,
} from "@/shared/ui/ui-tabs/helpers.ts";

import UiTabItem, { type TabItem, type TabValue } from "./ui-tab-item.tsx";

import styles from "./ui-tabs.module.scss";

type Props = {
  activeTab: TabValue;
  initValue?: TabValue;
  items: TabItem[];
  onSelect: (value: TabValue) => void;
};

const UiTabs: FC<Props> = ({ items, activeTab, initValue, onSelect }) => {
  const [activeTabIndex, setActiveTab] = useState(
    getInitActiveTabIndex(items, initValue),
  );
  const [indicatorStyle, setIndicatorStyle] = useState(
    getIndicatorStyles(0, 0),
  );
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const activeTab = tabRefs.current[activeTabIndex];
    const scrollContainer = scrollRef.current;

    if (activeTab && scrollContainer) {
      const { offsetWidth: tabWidth, offsetLeft: tabLeft } = activeTab;

      const scrollTo = tabLeft - scrollContainer.offsetWidth / 2 + tabWidth / 2;

      setIndicatorStyle(getIndicatorStyles(tabWidth, tabLeft));

      scrollContainer.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [activeTabIndex, items]);

  useEffect(() => {
    if (activeTab) {
      setActiveTab(getInitActiveTabIndex(items, activeTab));
    }
  }, [items, activeTab]);

  const clickOnTab =
    ({ value }: TabItem, index: number) =>
    () => {
      if (activeTabIndex === index) {
        return;
      }

      if (!activeTab) {
        setActiveTab(index);
      }

      onSelect(value);
    };

  const existsActiveIndex = activeTabIndex >= 0;

  const initTabRef = (index: number) => (element: HTMLLIElement) => {
    tabRefs.current[index] = element;
  };

  return (
    <div className={styles.container}>
      <ul ref={scrollRef} className={styles["tabs-group"]}>
        {items.map((tab, index) => (
          <UiTabItem
            key={tab.value}
            ref={initTabRef(index)}
            value={tab.value}
            title={tab.title}
            onCLick={clickOnTab(tab, index)}
            isActive={tab.value === activeTab}
          />
        ))}
        {existsActiveIndex && (
          <div className={styles.indicator} style={indicatorStyle} />
        )}
      </ul>
    </div>
  );
};

export default UiTabs;
