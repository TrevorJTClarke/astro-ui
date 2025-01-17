import { Bounty } from 'components/cards/bounty-card/types';
import { BountyInfoCard } from 'components/cards/bounty-info-card';
import { Modal } from 'components/modal';

import styles from 'features/bounty/dialogs/bounty-dialogs.module.scss';

import {
  CompleteBountyForm,
  CompleteBountyFormInput
} from 'features/bounty/dialogs/complete-bounty-dialog/complete-bounty-form/CompleteBountyForm';
import { getCompleteBountyProposal } from 'features/bounty/dialogs/complete-bounty-dialog/helpers';
import React, { FC, useCallback } from 'react';
import { SputnikService } from 'services/SputnikService';
import { useRouter } from 'next/router';
import { NOTIFICATION_TYPES, showNotification } from 'features/notifications';

export interface CompleteBountyDialogProps {
  isOpen: boolean;
  onClose: (...args: unknown[]) => void;
  data: Bounty;
  bond: string;
}

export const CompleteBountyDialog: FC<CompleteBountyDialogProps> = ({
  isOpen,
  onClose,
  data,
  bond
}) => {
  const router = useRouter();
  const daoId = router.query.dao as string;

  const handleSubmit = useCallback(
    (input: CompleteBountyFormInput) => {
      if (!daoId) return;

      const proposal = getCompleteBountyProposal(daoId, data.id, input, bond);

      SputnikService.createProposal(proposal).then(() => {
        showNotification({
          type: NOTIFICATION_TYPES.INFO,
          description: `The blockchain transactions might take some time to perform, please visit DAO details page in few seconds`,
          lifetime: 20000
        });
        onClose('submitted');
      });
    },
    [daoId, data.id, bond, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className={styles.header}>
        <h2>Complete bounty</h2>
      </header>
      <div className={styles.content}>
        <BountyInfoCard data={data} />
        <CompleteBountyForm onCancel={onClose} onSubmit={handleSubmit} />
      </div>
    </Modal>
  );
};
