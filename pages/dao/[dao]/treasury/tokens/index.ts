import Tokens, {
  TokensPageProps,
} from 'pages/dao/[dao]/treasury/tokens/TokensPage';
import { SputnikHttpService } from 'services/sputnik';
import { getChartData } from 'features/treasury/helpers';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<TokensPageProps> = async ({
  query,
}) => {
  const daoId = query.dao as string;

  const [daoTokens, dao, receipts, policyAffectsProposals] = await Promise.all([
    SputnikHttpService.getAccountTokens(daoId),
    SputnikHttpService.getDaoById(daoId),
    SputnikHttpService.getAccountReceipts(daoId),
    SputnikHttpService.findPolicyAffectsProposals(daoId),
  ]);

  if (!dao) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        chartData: getChartData(receipts),
        daoTokens,
        totalValue: dao.funds ?? '0',
        receipts,
        dao,
        policyAffectsProposals,
      },
    },
  };
};

export default Tokens;
