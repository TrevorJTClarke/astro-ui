import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/input/Input';
import { TextArea } from 'components/textarea/TextArea';
import { ProposalBanner } from 'features/dao-settings/components/proposal-banner';
import {
  getChangeConfigProposal,
  NameAndPurposeData
} from 'features/dao-settings/helpers';
import React, { useCallback, VFC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { SputnikService } from 'services/SputnikService';
import * as yup from 'yup';

import styles from './name-and-purpose-tab.module.scss';

export const schema = yup.object().shape({
  name: yup.string().min(2).required(),
  purpose: yup.string().max(500)
});

export interface NameAndPurposeTabProps {
  accountName: string;
  name: string;
  purpose: string;
}

export const NameAndPurposeTab: VFC<NameAndPurposeTabProps> = ({
  accountName,
  name,
  purpose
}) => {
  const [viewMode, setViewMode] = useToggle(true);
  const [isSubmitting, setSubmitting] = useToggle(false);

  const methods = useForm<NameAndPurposeData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name,
      purpose,
      details: '',
      externalUrl: ''
    },
    resolver: yupResolver(schema)
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, touchedFields, isDirty, isValid }
  } = methods;

  const onSubmit = useCallback(
    async (data: NameAndPurposeData) => {
      setSubmitting(true);
      await SputnikService.createProposal(
        getChangeConfigProposal(accountName, data)
      );
      setSubmitting(false);
      setViewMode(true);
    },
    [setSubmitting, accountName, setViewMode]
  );

  const onCancel = useCallback(() => {
    setViewMode(true);
    reset({
      name,
      purpose
    });
  }, [name, purpose, reset, setViewMode]);

  function getDisableTooltip() {
    if (!isDirty) return 'You need to make changes to submit proposal';

    if (!isValid) return 'Some fields are invalid';

    return undefined;
  }

  return (
    <>
      <FormProvider {...methods}>
        <ProposalBanner
          scope="config"
          title="Name & Purpose"
          form="settings"
          disable={!isValid || !isDirty || isSubmitting}
          disableTooltip={getDisableTooltip()}
          onEdit={setViewMode}
          viewMode={viewMode}
          onCancel={onCancel}
        />
      </FormProvider>
      <form
        id="settings"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.root}
      >
        <div className={styles.row}>
          <div className={styles.label}>Account name (cannot be changed)</div>
          <p>{accountName}</p>
        </div>
        <div className={styles.row}>
          <div>
            <div className={styles.label}>Name</div>
            {viewMode ? (
              <span>{name}</span>
            ) : (
              <Input
                {...register('name')}
                isValid={touchedFields.name && !errors.name?.message}
                size="block"
                maxLength={500}
                textAlign="left"
              />
            )}
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <div className={styles.label}>Purpose</div>
            {viewMode ? (
              <span className={styles.purpose}>{purpose}</span>
            ) : (
              <TextArea
                {...register('purpose')}
                // TODO Text area valid state?
                // isValid={touchedFields.purpose && !errors.purpose?.message}
                size="block"
                textAlign="left"
                resize="none"
                maxLength={500}
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};
