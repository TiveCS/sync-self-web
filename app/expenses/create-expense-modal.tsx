'use client';

import { actionCreateExpense } from '@/actions/expenses';
import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { createExpenseSchema } from '@/schemas/expenses';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MutateExpenseForm } from './mutate-expense-form';
import { useState } from 'react';

export function CreateExpenseModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { form, handleSubmitWithAction, action, resetFormAndAction } =
    useHookFormAction(actionCreateExpense, zodResolver(createExpenseSchema), {
      formProps: {
        defaultValues: {
          amount: 0,
          note: '',
          occurredAt: new Date(),
        },
      },
      actionProps: {
        onExecute: () => {
          toast.loading('Adding expense...', {
            id: 'add-expense',
          });
        },
        onSuccess: async () => {
          resetFormAndAction();
          setOpen(false);
          toast.success('Expense added successfully!', {
            id: 'add-expense',
          });

          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['expenses'],
            }),
            queryClient.invalidateQueries({
              queryKey: ['analytics-expenses'],
            }),
          ]);
        },
        onError: ({ error }) => {
          toast.error('Something went wrong when adding expense', {
            id: 'add-expense',
            description: error.serverError || 'Please try again later',
          });
        },
      },
    });

  return (
    <ResponsiveModal
      trigger={<Button className="w-fit">Add Expense</Button>}
      title="Add Expense"
      description="Add to track your expense"
      isOpen={open}
      setOpen={setOpen}
      preventClose={action.isExecuting}
    >
      <MutateExpenseForm
        form={form}
        handleSubmit={handleSubmitWithAction}
        isExecuting={action.isExecuting}
        submitText="Add Expense"
      />
    </ResponsiveModal>
  );
}
