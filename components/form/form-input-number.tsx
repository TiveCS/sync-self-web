import { formatNumber, revertFormatNumber } from '@/lib/utils';
import React from 'react';
import { InputNumber } from '../ui/input';
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormSetValue,
} from 'react-hook-form';

export type FormInputNumberProps<TFieldValues extends FieldValues> =
  React.ComponentProps<typeof InputNumber> & {
    formSetValue: UseFormSetValue<TFieldValues>;
    name: FieldPath<TFieldValues>;
    value: FieldPathValue<TFieldValues, FieldPath<TFieldValues>>;
  };

export function FormInputNumber<TFieldValues extends FieldValues>({
  formSetValue,
  value,
  name,
  ...props
}: FormInputNumberProps<TFieldValues>) {
  return (
    <InputNumber
      {...props}
      name={name}
      onChange={(e) =>
        formSetValue(
          name,
          revertFormatNumber(e.target.value) as FieldPathValue<
            TFieldValues,
            FieldPath<TFieldValues>
          >
        )
      }
      value={formatNumber(value)}
    />
  );
}
