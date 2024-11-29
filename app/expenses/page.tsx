'use client';

import { DateRangePicker } from '@/components/ui/date-picker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetExpenses } from '@/hooks/queries/use-get-expenses';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { CreateExpenseModal } from './create-expense-modal';
import { ExpenseAnalytics } from './expense-analytics';
import { ExpensesTable } from './expenses-table';
import * as datefns from 'date-fns';

export default function ExpensesPage() {
  const [period, setPeriod] = useState<DateRange | undefined>({
    from: datefns.startOfMonth(new Date()),
    to: datefns.endOfMonth(new Date()),
  });
  const { data: getExpensesData, isFetching: isExpensesFetching } =
    useGetExpenses({});

  const expenses = getExpensesData?.pages.flatMap((page) => page) || [];

  return (
    <>
      <header className="grid grid-flow-col gap-x-6 mt-8 pr-16">
        <ExpenseAnalytics />
      </header>

      {isExpensesFetching && (
        <div className="flex flex-row my-8 justify-between">
          <Skeleton className="h-8 w-1/5" />

          <Skeleton className="h-8 w-1/5" />
        </div>
      )}

      {expenses.length > 0 && (
        <div className="my-8 grid grid-cols-10 pr-16">
          <DateRangePicker
            date={period}
            setDate={setPeriod}
            className="col-span-3"
            placeholder="Pick expenses period"
            calendarProps={{
              mode: 'range',
              toDate: new Date(),
            }}
          />

          <div className="col-span-6" />

          <CreateExpenseModal />
        </div>
      )}

      <ScrollArea className="max-h-[28rem]">
        <ExpensesTable expenses={expenses} isExecuting={isExpensesFetching} />
      </ScrollArea>
    </>
  );
}
