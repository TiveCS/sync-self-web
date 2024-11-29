'use client';

import { actionGetExpenseAnalytics } from '@/actions/expenses';
import { GetExpenseAnalyticsDTO } from '@/schemas/expenses';
import { useQuery } from '@tanstack/react-query';
import { useAction } from 'next-safe-action/hooks';

export type UseGetExpenseAnalyticsArgs = GetExpenseAnalyticsDTO;

export function useGetExpenseAnalytics(args: UseGetExpenseAnalyticsArgs) {
  const { executeAsync } = useAction(actionGetExpenseAnalytics);

  return useQuery({
    queryKey: ['analytics-expenses', args],
    queryFn: () => executeAsync(args),
  });
}
