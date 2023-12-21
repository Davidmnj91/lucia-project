'use client';

import { Controller, FieldPath, useForm } from 'react-hook-form';
import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { ContactUsState, getContactUs } from '@/actions/contactUs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  CompanyContactSchema,
  PartnerContactSchema,
} from '@/schemas/contactSchemas';
import {
  checkboxStyles,
  ErrorField,
  inputStyles,
  labelStyles,
} from '@/components/form/form';
import { buttonTypes } from '@/components/button/button';
import clsx from 'clsx';
import ComboBoxWrapper from '@/components/select/select';
import { z } from 'zod';

type PartnerFormValues = z.infer<typeof PartnerContactSchema>;
export const PartnerForm = () => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState<ContactUsState, FormData>(
    getContactUs,
    null
  );
  const {
    register,
    control,
    formState: { isValid, errors },
    setError,
  } = useForm<PartnerFormValues>({
    mode: 'all',
    resolver: zodResolver(CompanyContactSchema),
  });

  const t = useTranslations('forms');

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === 'error') {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<PartnerFormValues>, {
          message: error.message,
        });
      });
    }
  }, [state, setError]);

  return (
    <>
      <h1 style={{ color: state?.status === 'success' ? 'green' : 'red' }}>
        {state?.message}
      </h1>
      <form className='flex flex-col justify-center gap-9' action={formAction}>
        <div>
          <Controller
            name='service'
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <ComboBoxWrapper
                label={t('input.service.label')}
                placeholder={t('input.service.placeholder')}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                options={[
                  {
                    id: 'erasmus',
                    label: t('input.service.options.erasmus'),
                    value: 'erasmus',
                  },
                  {
                    id: 'language-courses',
                    label: t('input.service.options.language-courses'),
                    value: 'language-courses',
                  },
                  {
                    id: 'concierge',
                    label: t('input.service.options.concierge'),
                    value: 'concierge',
                  },
                ]}
              />
            )}
          />
          <ErrorField
            name='service'
            errors={errors}
            message={t('input.service.error')}
          />
        </div>
        <div>
          <label htmlFor='name' className={labelStyles}>
            {t('input.name.label')}
          </label>
          <input
            id='name'
            {...register('name')}
            className={inputStyles}
            placeholder={t('input.name.placeholder')}
          />
          <ErrorField
            name='name'
            errors={errors}
            message={t('input.name.error')}
          />
        </div>
        <div>
          <label htmlFor='lastname' className={labelStyles}>
            {t('input.lastname.label')}
          </label>
          <input
            id='lastname'
            {...register('lastname')}
            className={inputStyles}
            placeholder={t('input.lastname.placeholder')}
          />
          <ErrorField
            name='lastname'
            errors={errors}
            message={t('input.lastname.error')}
          />
        </div>
        <div>
          <label htmlFor='applicantName' className={labelStyles}>
            {t('input.applicantName.label')}
          </label>
          <input
            id='applicantName'
            {...register('applicantName')}
            className={inputStyles}
            placeholder={t('input.applicantName.placeholder')}
          />
          <ErrorField
            name='applicantName'
            errors={errors}
            message={t('input.applicantName.error')}
          />
        </div>
        <div>
          <label htmlFor='email' className={labelStyles}>
            {t('input.email.label')}
          </label>
          <input
            id='email'
            {...register('email')}
            className={inputStyles}
            placeholder={t('input.email.placeholder')}
          />
          <ErrorField
            name='email'
            errors={errors}
            message={t('input.email.error')}
          />
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='terms'
              {...register('terms')}
              className={checkboxStyles}
            />
            <label htmlFor='terms' className={clsx('text-b-sm', labelStyles)}>
              {t('input.terms.label')}
            </label>
          </div>
          <ErrorField
            name='terms'
            errors={errors}
            message={t('input.terms.error')}
          />
        </div>
        <button
          className={clsx(
            'self-end',
            buttonTypes({ intent: 'secondary-light' })
          )}
          type='submit'
          disabled={pending || !isValid}
        >
          {t('submit')}
        </button>
      </form>
    </>
  );
};
