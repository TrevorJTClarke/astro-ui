import * as yup from 'yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { Input } from 'components/input/Input';
import { Select } from 'components/select/Select';
import { tokenOptions } from 'features/bounty/dialogs/create-bounty-dialog/components/create-bounty-form/helpers';
import { TextArea } from 'components/textarea/TextArea';
import {
  CreatePayoutInput,
  Token
} from 'features/treasury/request-payout-popup/types';
import { Button } from 'components/button/Button';
import { ExpandableDetails } from 'features/bounty/dialogs/expandable-details';
import styles from './request-payout-form.module.scss';

const schema = yup.object().shape({
  token: yup.string().required(),
  amount: yup.string(),
  recipient: yup.string(),
  detail: yup.string(),
  externalUrl: yup.string()
});

interface IRequestPayoutForm {
  token: Token;
  amount: string;
  recipient: string;
  detail: string;
  externalUrl: string;
}

interface RequestPayoutFormProps {
  initialValues?: CreatePayoutInput;
  onSubmit: () => void;
  onCancel: () => void;
}

export const RequestPayoutForm: React.FC<RequestPayoutFormProps> = ({
  initialValues,
  onSubmit,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields }
  } = useForm<IRequestPayoutForm>({
    resolver: yupResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
      <Select
        defaultValue={initialValues?.token}
        className={cn(styles.token)}
        placeholder=""
        size="block"
        label="Token"
        options={tokenOptions}
        {...register('token')}
        onChange={v =>
          setValue('token', (v || 'NEAR') as Token, {
            shouldDirty: true
          })
        }
      />
      <Input
        isValid={touchedFields.amount && !errors.amount?.message}
        defaultValue={initialValues?.amount}
        size="block"
        textAlign="left"
        type="number"
        {...register('amount')}
        label="Amount"
        className={cn(styles.input, styles.amount)}
      />
      <div className={styles.recipient}>
        <Input
          defaultValue={initialValues?.recipient}
          isValid={touchedFields.recipient && !errors.recipient?.message}
          size="block"
          textAlign="left"
          type="number"
          {...register('recipient')}
          placeholder="NEAR account name"
          label="Send to"
          className={cn(styles.input)}
        />
        <span className={cn(styles.ml8, styles['input-inline'])}>.near</span>
      </div>
      <div className={styles.detail}>
        <TextArea
          size="block"
          defaultValue={initialValues?.payoutDetail}
          textAlign="left"
          resize="none"
          placeholder="Sample text"
          className={cn(styles['text-area'])}
          label="detail"
          {...register('detail')}
        />
      </div>
      <Input
        size="block"
        defaultValue={initialValues?.externalUrl}
        isValid={touchedFields.externalUrl && !errors.externalUrl?.message}
        textAlign="left"
        {...register('externalUrl')}
        label="External URL"
        placeholder="Add link"
        className={cn(styles.input, styles.url)}
      />
      <div className={styles.vote}>
        <ExpandableDetails label="Vote details">
          {initialValues?.voteDetails}
        </ExpandableDetails>
      </div>
      <div className={styles.footer}>
        <Button
          variant="secondary"
          onClick={onCancel}
          size="small"
          className={styles.mr8}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          size="small"
          className={styles.ml8}
        >
          Propose
        </Button>
      </div>
    </form>
  );
};
