import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, HTMLProps, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Icon } from 'components/Icon';
import { Title } from 'components/Typography';
import { Input } from 'components/inputs/input/Input';
import { Button } from 'components/button/Button';
import { IconButton } from 'components/button/IconButton';
import { TextArea } from 'components/inputs/textarea/TextArea';

import { getSocialLinkIcon } from 'helpers/getSocialLinkIcon';
import { validUrlRegexp, validWebsiteName } from 'utils/regexp';

import { formatDaoAddress } from './helpers';

import styles from './dao-create-form.module.scss';

interface DaoCreateFormProps
  extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit'> {
  initialValues?: Partial<IDaoCreateForm>;
  onSubmit: SubmitHandler<IDaoCreateForm>;
}

export interface IDaoCreateForm {
  address: string;
  displayName: string;
  purpose: string;
  websites: string[];
  flag: File;
  flagPreview: string;
}

const schema = yup.object().shape({
  displayName: yup
    .string()
    .trim()
    .min(3, 'tooShortAddress')
    .matches(validWebsiteName, 'incorrectAddress')
    .required(),
  purpose: yup.string().max(500),
  websites: yup
    .array()
    .of(yup.string().matches(validUrlRegexp, 'Enter correct url!').required())
});

export const DaoCreateForm: FC<DaoCreateFormProps> = ({
  onSubmit,
  initialValues = { websites: [''] },
  ...props
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, touchedFields }
  } = useForm<IDaoCreateForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: initialValues
  });

  const displayName = watch('displayName');

  const [linksCount, setLinksCount] = useState(
    initialValues?.websites?.length ?? 0
  );

  function addLink() {
    setLinksCount(count => count + 1);
  }

  function removeLink(index: number) {
    const websites = getValues('websites');

    websites.splice(index, 1);

    setValue('websites', websites);
    setLinksCount(count => count - 1);
  }

  const showDaoNameErrorMessage = (message: string) => {
    switch (message) {
      case 'tooShortAddress':
        return 'at least 3 characters expected.';
      case 'incorrectAddress':
        return 'you can use letters and numbers only with hyphens and spaces in the middle.';
      default:
      case '':
        return '';
    }
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)} className={styles.root}>
      <section className={styles.addressSection}>
        <p className={styles.addressAlert}>
          <Icon
            width={24}
            name="buttonAlert"
            className={styles.addressAlertIcon}
          />
          <span className={styles.addressAlertText}>
            Choose wisely. You can&apos;t change this later.
          </span>
        </p>

        <Input
          isValid={touchedFields.displayName && !errors.displayName?.message}
          size="block"
          {...register('displayName')}
          label="display name"
        />

        {errors.displayName?.message && (
          <p className={styles.addressError}>
            Incorrect DAO name&nbsp;&mdash;{' '}
            {showDaoNameErrorMessage(errors.displayName?.message)}
          </p>
        )}
      </section>

      <section className={styles.info}>
        <div className={styles.addressInput}>
          <Input
            isValid={touchedFields.address && !errors.address?.message}
            size="block"
            textAlign="left"
            onChange={undefined}
            disabled
            value={formatDaoAddress(displayName)}
            label="DAO ADDRESS"
          />
          .sputnikdao.near
        </div>

        <TextArea
          size="block"
          maxLength={500}
          {...register('purpose')}
          label="Purpose"
        />
      </section>

      <section className={styles.links}>
        <Title size={5}>Links</Title>
        {Array.from({ length: linksCount }, (_, i) => i).map(index => (
          <div className={styles.link} key={index}>
            <Icon
              className={styles.socialIcon}
              name={getSocialLinkIcon(getValues(`websites.${index}` as const))}
              width={24}
            />
            <Input
              placeholder="https://"
              {...register(`websites.${index}` as const, {
                shouldUnregister: true
              })}
              key={`websites.${index}` as const}
              isValid={
                touchedFields.websites?.[index] &&
                !errors.websites?.[index]?.message
              }
              size="block"
            />
            <IconButton
              className={styles.deleteBtn}
              onClick={() => removeLink(index)}
              size="medium"
              icon="buttonDelete"
            />
          </div>
        ))}

        <Button
          className={styles.addLinkButton}
          type="button"
          onClick={addLink}
          variant="tertiary"
        >
          <Icon width={24} name="buttonAdd" /> Add Links
        </Button>
      </section>
    </form>
  );
};
