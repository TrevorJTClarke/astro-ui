import { Bounty } from 'components/cards/bounty-card/types';
import { useEffect, useState } from 'react';
import { SputnikService } from 'services/SputnikService';
import { BountyResponse } from 'types/bounties';

// TODO Proper data fetching
export function useDaoBounties(daoId: string): Bounty[] {
  const [bounties, setBounties] = useState<Bounty[]>([]);

  useEffect(() => {
    if (!daoId) return;

    SputnikService.getBountiesByDaoId(daoId).then(result => {
      const data: Bounty[] = result.map(
        (response: BountyResponse): Bounty => {
          return {
            amount: response.amount,
            forgivenessPeriod: response.dao.policy.bountyForgivenessPeriod,
            claimedBy: response.bountyClaims.map(claim => ({
              deadline: claim.deadline,
              accountId: claim.accountId,
              starTime: claim.startTime
            })),
            deadlineThreshold: response.maxDeadline,
            slots: Number(response.times),
            id: response.bountyId,
            token: 'NEAR',
            description: response.description
          };
        }
      );

      setBounties(data);
    });
  }, [daoId]);

  return bounties;
}
