import React, { FC } from 'react';

import Tabs from 'components/tabs/Tabs';
import { useSearchResults } from 'features/search/search-results/SearchResults';
import { DaosTabView } from 'features/search/search-results/components/daos-tab-view';
import { ProposalsTabView } from 'features/search/search-results/components/proposals-tab-view';
import { MembersTabView } from 'features/search/search-results/components/members-tab-view';

import styles from './search-results-renderer.module.scss';

export const SearchResultsRenderer: FC = () => {
  const { searchResults } = useSearchResults();

  // if (!searchResults) return null;

  const TABS = [
    {
      id: 0,
      label: `DAOs (${searchResults?.daos.length ?? 0})`,
      content: <DaosTabView />
    },
    {
      id: 1,
      label: `Proposals (${searchResults?.proposals.length ?? 0})`,
      content: <ProposalsTabView />
    },
    {
      id: 2,
      label: `Members (${searchResults?.members.length ?? 0})`,
      content: <MembersTabView />
    }
  ];

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.secondaryLabel}>results for</span>
        <span>&nbsp;&lsquo;{searchResults?.query}&rsquo;</span>
      </div>
      <div className={styles.content}>
        <Tabs tabs={TABS} />
      </div>
    </div>
  );
};
