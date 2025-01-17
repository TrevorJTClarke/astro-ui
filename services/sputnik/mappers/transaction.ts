import { formatYoktoValue } from 'helpers/format';
import { Receipt, Transaction, TransactionType } from 'types/transaction';
import Decimal from 'decimal.js';

type ReceiptAction = {
  receiptId: string;
  receiptPredecessorAccountId: string;
  receiptReceiverAccountId: string;
  actionKind: 'TRANSFER';
  args: {
    deposit: string;
    // eslint-disable-next-line camelcase
    method_name?: string;
  };
};

export type ReceiptDTO = {
  receiptId: string;
  predecessorAccountId: string;
  receiverAccountId: string;
  originatedFromTransactionHash: string;
  includedInBlockTimestamp: string;
  receiptAction: ReceiptAction;
};

export type TransactionDTO = {
  blockTimestamp: string;
  convertedIntoReceiptId: string;
  includedInBlockHash: string;
  includedInChunkHash: string;
  indexInChunk: number;
  nonce: string;
  receiptConversionGasBurnt: string;
  receiptConversionTokensBurnt: string;
  receiverAccountId: string;
  signature: string;
  signerAccountId: string;
  signerPublicKey: string;
  status: string;
  transactionAction: {
    actionKind: 'TRANSFER' | 'FUNCTION_CALL';
    args: {
      deposit: string;
      // eslint-disable-next-line camelcase
      method_name: string;
    };
    deposit: string;
    indexInTransaction: number;
  };
  transactionHash: string;
  receipts: ReceiptDTO[];
};

export type GetTransactionsResponse = {
  data: TransactionDTO[];
};

export function mapTransactionDTOToTransaction(
  daoId: string,
  data: TransactionDTO[]
): Transaction[] {
  return (
    data?.reduce((result, item) => {
      let deposit;
      let type = 'Deposit' as TransactionType;

      if (
        (item.transactionAction.actionKind === 'FUNCTION_CALL' &&
          item.transactionAction.args.method_name === 'create') ||
        (item.transactionAction.actionKind === 'FUNCTION_CALL' &&
          item.transactionAction.args.deposit !== '0')
      ) {
        type = 'Deposit';
        deposit = formatYoktoValue(item.transactionAction.args.deposit);
      } else if (
        item.transactionAction.actionKind === 'FUNCTION_CALL' &&
        item.transactionAction.args.deposit === '0' &&
        item.receipts.length
      ) {
        type = 'Withdraw';

        const acc = item.receipts.reduce((res, r) => {
          if (
            r.predecessorAccountId === daoId &&
            r.receiptAction?.actionKind === 'TRANSFER' &&
            r.receiptAction.args.deposit !== '0'
          ) {
            const amountYokto = new Decimal(r.receiptAction.args.deposit);

            return res.add(amountYokto);
          }

          return res;
        }, new Decimal(0));

        deposit = formatYoktoValue(acc.toString());
      }

      if (deposit) {
        result.push({
          transactionId: item.transactionHash,
          timestamp: Number(item.blockTimestamp) / 1000000,
          receiverAccountId: item.receiverAccountId,
          signerAccountId: item.signerAccountId,
          deposit,
          type,
          date: new Date(Number(item.blockTimestamp) / 1000000).toISOString()
        });
      }

      return result;
    }, [] as Transaction[]) ?? []
  );
}

export type GetAccountReceiptsResponse = {
  data: ReceiptDTO[];
};

export const mapReceiptsResponse = (
  accountId: string,
  data: ReceiptDTO[]
): Receipt[] => {
  return data.reduce((res, item) => {
    let deposit = '';
    let type = 'Deposit' as TransactionType;

    if (item) {
      if (
        !item.receiptAction ||
        !item.receiptAction.args?.deposit ||
        item.receiptAction.args.method_name === 'act_proposal' ||
        item.receiptAction.args.method_name === 'ft_transfer'
      ) {
        // filter out not relevant items
        return res;
      }

      if (item.receiptAction.args.method_name === 'add_proposal') {
        // catch incoming bond from create proposal
        type = 'Deposit';
        deposit = formatYoktoValue(item.receiptAction.args.deposit);
      } else if (
        item.predecessorAccountId === accountId &&
        item.receiptAction?.args?.deposit
      ) {
        // catch withdraw case
        type = 'Withdraw';
        deposit = formatYoktoValue(item.receiptAction.args.deposit);
      } else if (
        item.receiverAccountId === accountId &&
        item.receiptAction?.args?.deposit
      ) {
        // catch deposit case
        type = 'Deposit';
        deposit = formatYoktoValue(item.receiptAction.args.deposit);
      }

      if (deposit) {
        res.push({
          receiptId: item.receiptId,
          timestamp: Number(item.includedInBlockTimestamp) / 1000000,
          receiverAccountId: item.receiverAccountId,
          predecessorAccountId: item.predecessorAccountId,
          deposit,
          type,
          date: new Date(
            Number(item.includedInBlockTimestamp) / 1000000
          ).toISOString()
        });
      }
    }

    return res;
  }, [] as Receipt[]);
};
