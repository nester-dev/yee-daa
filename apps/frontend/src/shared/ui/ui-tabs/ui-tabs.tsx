import {
  type FC,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getIndicatorStyles,
  getInitActiveTabIndex,
} from "@/shared/ui/ui-tabs/helpers.ts";

import UiTabItem, { type TabItem, type TabValue } from "./ui-tab-item.tsx";

import styles from "./ui-tabs.module.scss";

type Props = {
  activeTab?: TabValue;
  initValue?: TabValue;
  items: TabItem[];
  onSelect: (value: TabValue) => void;
};

const UiTabs: FC<Props> = ({ items, activeTab, initValue, onSelect }) => {
  const [internalIndex, setInternalIndex] = useState(
    getInitActiveTabIndex(items, initValue),
  );
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);

  const isControlled = activeTab !== undefined;

  const controlledIndex = useMemo(
    () => getInitActiveTabIndex(items, activeTab),
    [items, activeTab],
  );

  const index = isControlled ? controlledIndex : internalIndex;

  useLayoutEffect(() => {
    const el = tabRefs.current[index];
    const scroll = scrollRef.current;

    if (!el || !scroll) return;

    const { offsetWidth, offsetLeft } = el;

    setIndicatorStyle(getIndicatorStyles(offsetWidth, offsetLeft));

    scroll.scrollTo({
      left: offsetLeft - scroll.offsetWidth / 2 + offsetWidth / 2,
      behavior: "smooth",
    });
  }, [index, items]);

  const handleClick = useCallback(
    (tab: TabItem, idx: number) => () => {
      if (!isControlled) setInternalIndex(idx);
      onSelect(tab.value);
    },
    [isControlled, onSelect],
  );

  return (
    <div className={styles.container}>
      <ul ref={scrollRef} className={styles["tabs-group"]} role="tablist">
        {items.map((tab, idx) => (
          <UiTabItem
            key={tab.value}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            value={tab.value}
            title={tab.title}
            onClick={handleClick(tab, idx)}
            isActive={idx === index}
          />
        ))}

        <div className={styles.indicator} style={indicatorStyle} />
      </ul>
    </div>
  );
};

export default UiTabs;
