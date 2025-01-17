import React, { FC } from 'react';
import { useSearchResults } from 'features/search/search-results/SearchResults';
import { DaoDetails } from 'features/dao-home/components/dao-details/DaoDetails';
import { ProposalTrackerCard } from 'components/cards/proposal-tracker-card/ProposalTrackerCard';
import { DaoInfoCard } from 'components/cards/dao-info-card/DaoInfoCard';
import { Highlighter } from 'features/search/search-results/components/highlighter';
import { NoSearchResultsView } from 'features/search/search-results/components/no-search-results-view';

import styles from './dao-tab-view.module.scss';

export const DaosTabView: FC = () => {
  const { searchResults } = useSearchResults();

  if (!searchResults?.daos?.length)
    return <NoSearchResultsView query={searchResults?.query} />;

  return (
    <div className={styles.root}>
      <Highlighter>
        {searchResults?.daos.map(item => {
          const title = item.displayName || item.name;
          const daoDetails = {
            title,
            subtitle: item.id,
            description: item.description,
            links: [],
            transaction: item.txHash,
            createdAt: item.createdAt,
            more: {
              label: 'Show more',
              link: `/dao/${item.id}`
            }
          };
          const flag = item.logo;
          const proposalTrackerInfo = {
            activeVotes: 14,
            totalProposals: 3
          };
          const daoInfo = {
            items: [
              {
                label: 'DAO funds',
                value: `${item.funds}`,
                valueType: `USD`
              },
              {
                label: 'Members',
                value: `${item.members}`
              }
            ]
          };

          return (
            <React.Fragment key={item.id}>
              <div className={styles.card}>
                <div className={styles.daoDetails}>
                  <DaoDetails {...daoDetails} flag={flag} />
                </div>
                <div className={styles.proposals}>
                  <ProposalTrackerCard
                    {...proposalTrackerInfo}
                    onClick={undefined}
                    action={null}
                  />
                </div>
                <div className={styles.daoInfo}>
                  <DaoInfoCard {...daoInfo} />
                </div>
              </div>
              <div className={styles.divider} />
            </React.Fragment>
          );
        })}
      </Highlighter>
    </div>
  );
};
