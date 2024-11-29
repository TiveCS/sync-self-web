'use server';

import { apiV1 } from '@/lib/api';
import { authedActionClient } from '@/lib/safe-action';
import { isErrorResponse } from '@/responses/base';
import {
  ExpenseGetAnalyticsResponse,
  ExpensesCreateResponse,
  ExpensesGetByIdResponse,
  ExpensesGetManyResponse,
} from '@/responses/expenses';
import {
  createExpenseSchema,
  deleteExpenseSchema,
  editExpenseSchema,
  getExpenseAnalyticsSchema,
  getExpenseByIdSchema,
  getExpensesFiltersSchema,
} from '@/schemas/expenses';

export const actionGetExpenses = authedActionClient
  .schema(getExpensesFiltersSchema.optional())
  .action(async ({ ctx, parsedInput: filters }) => {
    const searchParams = new URLSearchParams();

    if (filters?.limit) {
      searchParams.append('limit', filters.limit.toString());
    }

    if (filters?.cursor) {
      searchParams.append('cursor', filters.cursor);
    }

    if (filters?.category) {
      searchParams.append('category', filters.category.toString());
    }

    if (filters?.from) {
      searchParams.append('from', filters.from.toISOString());
    }

    if (filters?.to) {
      searchParams.append('to', filters.to.toISOString());
    }

    const res = await apiV1
      .get<ExpensesGetManyResponse>('expenses', {
        headers: {
          Authorization: `Bearer ${ctx.accessToken}`,
        },
        searchParams,
      })
      .json();

    if (isErrorResponse(res)) throw new Error(res.error);

    return res;
  });

export const actionCreateExpense = authedActionClient
  .schema(createExpenseSchema)
  .action(async ({ ctx, parsedInput: dto }) => {
    const occurredAt = dto.occurredAt.toISOString();

    console.log(occurredAt);

    return await apiV1
      .post<ExpensesCreateResponse>('expenses', {
        headers: {
          Authorization: `Bearer ${ctx.accessToken}`,
        },
        json: {
          ...dto,
          note: dto.note?.trim().length ? dto.note : undefined,
          occurredAt,
        },
      })
      .json();
  });

export const actionEditExpense = authedActionClient
  .schema(editExpenseSchema)
  .action(async ({ ctx, parsedInput: dto }) => {
    return await apiV1
      .put(`expenses/${dto.id}`, {
        headers: {
          Authorization: `Bearer ${ctx.accessToken}`,
        },
        json: dto,
      })
      .json();
  });

export const actionDeleteExpense = authedActionClient
  .schema(deleteExpenseSchema)
  .action(async ({ ctx, parsedInput: dto }) => {
    return await apiV1
      .delete(`expenses/${dto.id}`, {
        headers: {
          Authorization: `Bearer ${ctx.accessToken}`,
        },
      })
      .json();
  });

export const actionGetById = authedActionClient
  .schema(getExpenseByIdSchema)
  .action(async ({ ctx, parsedInput }) => {
    const res = await apiV1
      .get<ExpensesGetByIdResponse>(`expenses/${parsedInput.id}`, {
        headers: {
          Authorization: `Bearer ${ctx.accessToken}`,
        },
      })
      .json();

    if (isErrorResponse(res)) throw new Error(res.error);

    return res;
  });

export const actionGetExpenseAnalytics = authedActionClient
  .schema(getExpenseAnalyticsSchema)
  .action(async ({ ctx, parsedInput }) => {
    const res = await apiV1
      .get<ExpenseGetAnalyticsResponse>('analytics/expenses', {
        headers: {
          Authorization: `Bearer ${ctx.accessToken}`,
        },
        searchParams: {
          firstFrom: parsedInput.firstFrom.toISOString(),
          firstTo: parsedInput.firstTo.toISOString(),
          secondFrom: parsedInput.secondFrom.toISOString(),
          secondTo: parsedInput.secondTo.toISOString(),
        },
      })
      .json();

    if (isErrorResponse(res)) throw new Error(res.error);

    return res;
  });
