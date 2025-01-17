import React, { FC } from 'react';

import { Bounty } from 'components/cards/bounty-card/types';
import { BountyInfoCard } from 'components/cards/bounty-info-card';
import styles from 'features/bounty/dialogs/bounty-dialogs.module.scss';
import { Button } from 'components/button/Button';
import { formatDeadlineDate, formatForgivenessDuration } from 'helpers/format';

interface ClaimBountyContentProps {
  onClose: (...args: unknown[]) => void;
  onSubmit: () => void;
  data: Bounty;
}

const ClaimBountyContent: FC<ClaimBountyContentProps> = ({
  data,
  onClose,
  onSubmit
}) => {
  const forgivenessDuration = formatForgivenessDuration(data.forgivenessPeriod);
  const deadline = formatDeadlineDate(data.deadlineThreshold);

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <BountyInfoCard data={data} />
      </div>
      <div className={styles.deadline}>
        <div className={styles.label}>Deadline</div>
        <div className={styles.value}>{deadline}</div>
        <p>
          You can unclaim a bounty for the next &nbsp;
          <b>{forgivenessDuration}</b>. After that, if you miss your deadline,
          you will loose your bond.
        </p>
      </div>

      <div className={styles.footer}>
        <Button
          variant="secondary"
          onClick={onClose}
          size="small"
          className={styles.mr8}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          size="small"
          className={styles.ml8}
        >
          Claim
        </Button>
      </div>
    </div>
  );
};

export default ClaimBountyContent;
