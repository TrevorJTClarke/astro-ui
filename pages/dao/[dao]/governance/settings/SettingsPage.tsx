import { BreadCrumbs } from 'astro_2.0/components/BreadCrumbs';
import NavLink from 'astro_2.0/components/NavLink';
import React, { useCallback, useState } from 'react';
import { DAO } from 'types/dao';
import { ProposalVariant } from 'types/proposal';
import { CreateProposal } from 'astro_2.0/features/CreateProposal';
import classNames from 'classnames';
import { Icon } from 'components/Icon';
import { DaoSetting } from 'astro_2.0/features/DaoGovernance/components/DaoSetting';
import { SettingsCard } from 'astro_2.0/features/DaoGovernance/components/SettingsCard';
import { InfoValue } from 'astro_2.0/components/InfoBlockWidget/components/InfoValue';
import { Badge } from 'components/badge/Badge';
import { getBadgeVariant } from 'features/proposal/helpers';
import { DefaultVotingPolicy } from 'astro_2.0/components/DefaultVotingPolicy';
import { formatYoktoValue } from 'helpers/format';
import { FlagPreview } from 'astro_2.0/features/CreateDao/components/FlagPreview/FlagPreview';
import { nanosToDays } from 'astro_2.0/features/DaoGovernance/helper';
import styles from './SettingsPage.module.scss';

export interface SettingsPageProps {
  dao: DAO;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ dao }) => {
  const [
    proposalVariant,
    setProposalVariant,
  ] = useState<ProposalVariant | null>(null);

  const createProposalHandler = useCallback(
    (variant: ProposalVariant) => () => setProposalVariant(variant),
    []
  );

  const [proposalExp, proposalExpTimeUnit] = nanosToDays(
    dao.policy.proposalPeriod
  );

  const [bountyForgiveness, bountyForgivenessTimeUnit] = nanosToDays(
    dao.policy.bountyForgivenessPeriod
  );

  return (
    <>
      {proposalVariant && (
        <div className={styles.newProposal}>
          <CreateProposal
            dao={dao}
            showFlag={false}
            proposalVariant={proposalVariant}
            onClose={() => setProposalVariant(null)}
          />
        </div>
      )}

      <div className={styles.root}>
        <BreadCrumbs className={styles.breadcrumbsRow}>
          <NavLink href="/all/daos">All DAOs</NavLink>
          <NavLink href={`/dao/${dao?.id}`}>
            {dao?.displayName || dao?.id}
          </NavLink>
          <span>DAO settings</span>
        </BreadCrumbs>
        <div className={styles.titleRow}>DAO settings</div>
        <DaoSetting
          settingsName="Links"
          className={styles.linksRow}
          settingsChangeHandler={createProposalHandler(
            ProposalVariant.ProposeChangeDaoLinks
          )}
        >
          {dao.links.map(link => (
            <div
              className={classNames(styles.container, styles.row, styles.link)}
            >
              <Icon name="socialAnyUrl" className={styles.linkIcon} /> {link}
            </div>
          ))}
          <div className={classNames(styles.rowSeparator)} />
        </DaoSetting>
        <DaoSetting
          settingsName="Bond and deadlines"
          className={styles.bondAndDeadlineRow}
          settingsChangeHandler={createProposalHandler(
            ProposalVariant.ProposeChangeBonds
          )}
        >
          <div className={styles.settingsContainer}>
            <SettingsCard
              settingName="Proposals"
              settings={[
                {
                  label: 'Bond to create a proposal',
                  value: (
                    <InfoValue
                      value={formatYoktoValue(dao.policy.proposalBond, 24)}
                      label="NEAR"
                    />
                  ),
                },
                {
                  label: 'Time before proposal expires',
                  value: (
                    <InfoValue
                      value={proposalExp}
                      label={proposalExpTimeUnit}
                    />
                  ),
                },
              ]}
            />
            <SettingsCard
              settingName="Bounties"
              settings={[
                {
                  label: 'Bond to claim a bounty',
                  value: (
                    <InfoValue
                      value={formatYoktoValue(dao.policy.bountyBond, 24)}
                      label="NEAR"
                    />
                  ),
                },
                {
                  label: 'Time to unclaim a bounty without penalty',
                  value: (
                    <InfoValue
                      value={bountyForgiveness}
                      label={bountyForgivenessTimeUnit}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div className={classNames(styles.rowSeparator)} />
        </DaoSetting>
        <DaoSetting
          settingsName="Voting policy"
          className={styles.votingPolicyRow}
          settingsChangeHandler={createProposalHandler(
            ProposalVariant.ProposeChangeVotingPolicy
          )}
        >
          <div className={styles.groupsWrapper}>
            {dao.groups.map(group => {
              return (
                <Badge
                  size="small"
                  key={group.slug}
                  variant={getBadgeVariant(group.name)}
                >
                  {group.name}
                </Badge>
              );
            })}
          </div>
          <DefaultVotingPolicy
            policy={dao.policy.defaultVotePolicy}
            groups={dao.groups}
          />
          <div className={classNames(styles.rowSeparator)} />
        </DaoSetting>
        <DaoSetting
          settingsName="Your Flag and Logo"
          className={styles.flagAndLogoRow}
          settingsChangeHandler={createProposalHandler(
            ProposalVariant.ProposeChangeDaoFlag
          )}
        >
          {dao.flagCover && dao.flagLogo && (
            <FlagPreview logoFile={dao.flagLogo} coverFile={dao.flagCover} />
          )}
        </DaoSetting>
      </div>
    </>
  );
};
