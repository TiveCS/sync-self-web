import { ExpenseCategory } from '@/models/expenses';
import { z } from 'zod';

export const createExpenseSchema = z.object({
  amount: z.number().int().positive(),
  note: z.string().max(255).optional(),
  occurredAt: z.date(),
  category: z.nativeEnum(ExpenseCategory),
});

export const editExpenseSchema = createExpenseSchema.extend({
  id: z.string(),
});

export const getExpenseByIdSchema = z.object({
  id: z.string(),
});

export const getExpensesFiltersSchema = z.object({
  category: z.nativeEnum(ExpenseCategory).optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  limit: z.number().int().positive().default(20).optional(),
  cursor: z.string().optional(),
});

export const deleteExpenseSchema = z.object({
  id: z.string(),
});

export const getExpenseAnalyticsSchema = z.object({
  firstFrom: z.date(),
  firstTo: z.date(),
  secondFrom: z.date(),
  secondTo: z.date(),
});

export type CreateExpenseDTO = z.infer<typeof createExpenseSchema>;
export type EditExpenseDTO = z.infer<typeof editExpenseSchema>;
export type GetExpensesFiltersDTO = z.infer<typeof getExpensesFiltersSchema>;

export type GetExpenseAnalyticsDTO = z.infer<typeof getExpenseAnalyticsSchema>;
