import cn from 'classnames';
import isNil from 'lodash/isNil';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  resetIdCounter,
  Tab,
  TabList,
  TabPanel,
  Tabs as ReactTabs
} from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

// Styles
import styles from './tabs.module.scss';

// Types
import { TabItem } from './types';

export interface TabsProps<T> {
  className?: string;
  tabs: TabItem<T>[];
  fitContent?: boolean;
  isControlled?: boolean;
  renderTabHeader?: (id: string, label?: string | undefined) => void;
  onTabSelect?: (name: T) => void;
  skipShallow?: boolean;
}

resetIdCounter();

const Tabs = <T,>(
  props: PropsWithChildren<TabsProps<T>>
): JSX.Element | null => {
  const {
    tabs,
    className,
    fitContent,
    isControlled = true,
    onTabSelect,
    skipShallow = false,
    children
  } = props;
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);

  const rootClassName = cn(styles.root, className, {
    [styles.fitContent]: fitContent
  });

  useEffect(() => {
    const queryTabIndex = router.query.tab;

    if (
      isNil(queryTabIndex) ||
      (!isNil(queryTabIndex) && +queryTabIndex !== tabIndex)
    ) {
      const newTabIndex = queryTabIndex ? +queryTabIndex : 0;

      setTabIndex(newTabIndex);

      if (onTabSelect) {
        const name = tabs[newTabIndex]?.label;

        onTabSelect(name);
      }
    }
    // eslint-disable-next-line
  }, [router, router.query.tab, tabIndex, onTabSelect]);

  if (isNil(tabIndex)) {
    return null;
  }

  let tabsProps = {};

  if (isControlled) {
    tabsProps = {
      selectedIndex: tabIndex,
      onSelect: (index: number) => {
        if (onTabSelect) {
          const name = tabs[index]?.label;

          onTabSelect(name);
        }

        router.push(
          {
            pathname: '',
            query: {
              ...router.query,
              tab: index
            }
          },
          undefined,
          { shallow: !skipShallow }
        );
      }
    };
  }

  return (
    <div className={rootClassName}>
      <ReactTabs {...tabsProps}>
        <div className={styles.tabsWrapper}>
          <TabList className={styles.tabs}>
            {tabs.map(item => (
              <Tab
                key={item.id}
                selectedClassName={styles.active}
                className={cn(styles.tab, item.className)}
                data-name={item.label}
              >
                {item.label}
              </Tab>
            ))}
          </TabList>
          <div className={styles.optional}>{children}</div>
        </div>
        {tabs.map(item => (
          <TabPanel key={item.id}>{item.content}</TabPanel>
        ))}
      </ReactTabs>
    </div>
  );
};

export default Tabs;
