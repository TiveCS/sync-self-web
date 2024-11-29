'use client';

import { FormInputNumber } from '@/components/form/form-input-number';
import { SmartDatetimeInput } from '@/components/ui/extension/smart-datetime-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ExpenseCategory, ExpenseCategoryLabels } from '@/models/expenses';
import { CreateExpenseDTO } from '@/schemas/expenses';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';

export type MutateExpenseFormProps = {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  form: UseFormReturn<CreateExpenseDTO>;
  isExecuting: boolean;
  submitText?: string;
};

export function MutateExpenseForm({
  form,
  handleSubmit,
  isExecuting,
  submitText = 'Add Expense',
}: MutateExpenseFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <FormInputNumber
                  placeholder="Your expense amount"
                  formSetValue={form.setValue}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occurredAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Date</FormLabel>
              <FormControl>
                <SmartDatetimeInput
                  name={field.name}
                  placeholder="e.g. Today at 7 PM"
                  onValueChange={field.onChange}
                  value={field.value}
                  popoverProps={{
                    modal: true,
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(v) => {
                  const category = parseInt(v, 10) as ExpenseCategory;
                  field.onChange(category);
                }}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expense category" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {Object.entries(ExpenseCategoryLabels).map(([key, label]) => (
                    <SelectItem key={label} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Groceries Shopping" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isExecuting}>
          {isExecuting && <LoaderCircle className="animate-spin" />}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
