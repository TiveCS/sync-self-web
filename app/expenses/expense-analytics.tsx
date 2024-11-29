'use client';

import { ReportCard } from '@/components/report-card';
import { useGetExpenseAnalytics } from '@/hooks/queries/use-get-expense-analytics';
import { formatNumber } from '@/lib/utils';
import * as datefns from 'date-fns';

export function ExpenseAnalytics() {
  const today = new Date();
  const yesterday = datefns.add(today, { days: -1 });

  const [todayStart, todayEnd] = [
    datefns.set(today, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    datefns.set(today, {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    }),
  ];

  const [yesterdayStart, yesterdayEnd] = [
    datefns.set(yesterday, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    datefns.set(yesterday, {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    }),
  ];

  const thisWeekFirstDay = datefns.startOfWeek(todayStart, { weekStartsOn: 1 });
  const previousWeekFirstDay = datefns.addWeeks(thisWeekFirstDay, -1);

  const [thisWeekStart, thisWeekEnd] = [
    datefns.set(thisWeekFirstDay, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    datefns.set(today, {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    }),
  ];

  const [previousWeekStart, previousWeekEnd] = [
    datefns.set(previousWeekFirstDay, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    datefns.set(datefns.endOfWeek(previousWeekFirstDay, { weekStartsOn: 1 }), {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    }),
  ];

  const { data: getDailyAnalytics, isFetching: isDailyAnalyticsFetching } =
    useGetExpenseAnalytics({
      firstFrom: yesterdayStart,
      firstTo: yesterdayEnd,
      secondFrom: todayStart,
      secondTo: todayEnd,
    });

  const { data: getWeeklyAnalytics, isFetching: isWeeklyAnalyticsFetching } =
    useGetExpenseAnalytics({
      firstFrom: previousWeekStart,
      firstTo: previousWeekEnd,
      secondFrom: thisWeekStart,
      secondTo: thisWeekEnd,
    });

  const yesterdayTotal = getDailyAnalytics?.data?.first.total || 0;
  const todayTotal = getDailyAnalytics?.data?.second.total || 0;
  const isYesterdayHasInsight = yesterdayTotal > 0;
  const isDailySpendMore = yesterdayTotal > todayTotal;

  const dailyTotalDiff = formatNumber(
    Math.abs(yesterdayTotal - todayTotal),
    'currency'
  );

  const lastWeekTotal = getWeeklyAnalytics?.data?.first.total || 0;
  const thisWeekTotal = getWeeklyAnalytics?.data?.second.total || 0;
  const isLastWeekHasInsight = lastWeekTotal > 0;

  const isWeeklySpendMore = lastWeekTotal > thisWeekTotal;

  const weeklyTotalDiff = formatNumber(
    Math.abs(lastWeekTotal - thisWeekTotal),
    'currency'
  );
  const thisWeekAverage = getWeeklyAnalytics?.data?.second.average || 0;
  const lastWeekAverage = getWeeklyAnalytics?.data?.first.average || 0;

  const isWeeklyAverageMore = lastWeekAverage > thisWeekAverage;

  return (
    <>
      <ReportCard
        title="Today Expense"
        description={
          isYesterdayHasInsight ? (
            isDailySpendMore ? (
              <>
                You spent{' '}
                <span className="text-destructive">{dailyTotalDiff}</span> more
                today
              </>
            ) : (
              <>
                You spent{' '}
                <span className="text-green-600">{dailyTotalDiff}</span> less
                today
              </>
            )
          ) : (
            <>There are no expenses yesterday</>
          )
        }
        content={formatNumber(todayTotal, 'currency')}
        isLoading={isDailyAnalyticsFetching}
      />

      <ReportCard
        title="This Week Expense"
        description={
          isLastWeekHasInsight ? (
            isWeeklySpendMore ? (
              <>
                You spent{' '}
                <span className="text-destructive">{lastWeekTotal}</span> more
                this week
              </>
            ) : (
              <>
                You spent{' '}
                <span className="text-green-600">{weeklyTotalDiff}</span> less
                this week
              </>
            )
          ) : (
            <>There are no expenses last week</>
          )
        }
        content={formatNumber(thisWeekTotal, 'currency')}
        isLoading={isWeeklyAnalyticsFetching}
      />

      <ReportCard
        title="This Week Average Expense"
        description={
          isLastWeekHasInsight ? (
            isWeeklyAverageMore ? (
              <>
                You spent{' '}
                <span className="text-destructive">
                  {formatNumber(lastWeekAverage, 'currency')}
                </span>{' '}
                more last week
              </>
            ) : (
              <>
                You spent{' '}
                <span className="text-green-600">
                  {formatNumber(thisWeekAverage, 'currency')}
                </span>{' '}
                less last week
              </>
            )
          ) : (
            <>There are no expenses last week</>
          )
        }
        content={formatNumber(thisWeekAverage, 'currency')}
        isLoading={isWeeklyAnalyticsFetching}
      />
    </>
  );
}
