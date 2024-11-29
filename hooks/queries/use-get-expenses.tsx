'use client';

import { actionGetExpenses } from '@/actions/expenses';
import { ExpenseOverview } from '@/models/expenses';
import { ApiErrorResponse } from '@/responses/base';
import { GetExpensesFiltersDTO } from '@/schemas/expenses';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useAction } from 'next-safe-action/hooks';

export type UseGetExpensesArgs = GetExpensesFiltersDTO;

export function useGetExpenses(args: UseGetExpensesArgs) {
  const { executeAsync } = useAction(actionGetExpenses);

  /**
   * useQuery({
    queryKey: ['expenses', args],
    queryFn: async () => {
      const result = await executeAsync({ limit: 20, ...args });

      if (result?.serverError) {
        throw new Error(result.serverError);
      }

      return result?.data;
    },
  });
   */

  return useInfiniteQuery<ExpenseOverview[]>({
    queryKey: ['expenses', args],
    queryFn: async ({ pageParam }) => {
      const result = await executeAsync({ limit: 20, ...args });

      if (result?.serverError) {
        throw new Error(result.serverError);
      }

      return result?.data || [];
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.length === 20
        ? lastPage[lastPage.length - 1].id
        : undefined;
    },
  });
}
