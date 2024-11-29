import { Expense, ExpenseOverview } from '@/models/expenses';
import { ApiBaseResponse } from './base';

export type ExpensesCreateResponse = ApiBaseResponse<{ id: string }>;

export type ExpensesGetByIdResponse = ApiBaseResponse<Expense>;

export type ExpensesGetManyResponse = ApiBaseResponse<ExpenseOverview[]>;

export type ExpenseGetAnalyticsResponse = ApiBaseResponse<{
  first: { count: number; total: number; average: number };
  second: { count: number; total: number; average: number };
}>;
