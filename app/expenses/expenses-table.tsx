'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, formatNumber, formatReadableDate } from '@/lib/utils';
import { ExpenseCategoryLabels, ExpenseOverview } from '@/models/expenses';
import { CreateExpenseModal } from './create-expense-modal';

export type ExpensesTableProps = {
  expenses: ExpenseOverview[];
  isExecuting: boolean;
};

export function ExpensesTable({ expenses, isExecuting }: ExpensesTableProps) {
  const isExpensesEmpty = expenses.length === 0;

  return (
    <Table className={cn(!isExecuting && isExpensesEmpty && 'min-h-96')}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-52">Transaction Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!isExecuting &&
          expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{formatReadableDate(expense.occurredAt)}</TableCell>
              <TableCell className="font-medium">
                {formatNumber(expense.amount, 'currency')}
              </TableCell>
              <TableCell>{ExpenseCategoryLabels[expense.category]}</TableCell>
              <TableCell>{expense.note ?? '-'}</TableCell>
            </TableRow>
          ))}

        {!isExecuting && isExpensesEmpty && (
          <>
            <TableRow>
              <TableCell colSpan={4} className="text-center space-y-4">
                <p className="text-xl font-medium">No expenses found</p>
                <CreateExpenseModal />
              </TableCell>
            </TableRow>
          </>
        )}

        {isExecuting &&
          Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
