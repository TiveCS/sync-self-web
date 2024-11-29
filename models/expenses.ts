export enum ExpenseCategory {
  Education = 1,
  Entertainment = 2,
  Food = 3,
  Healthcare = 4,
  Rent = 5,
  Transportation = 6,
  Groceries = 7,
  Utilities = 8,
  Donation = 9,
  Other = 10,
}

export const ExpenseCategoryLabels = {
  1: 'Education',
  2: 'Entertainment',
  3: 'Food',
  4: 'Healthcare',
  5: 'Rent',
  6: 'Transportation',
  7: 'Groceries',
  8: 'Utilities',
  9: 'Donation',
  10: 'Other',
} satisfies Record<ExpenseCategory, string>;

export type Expense = {
  id: string;
  userId: string;
  amount: number;
  note: string | null;
  category: ExpenseCategory;
  occurredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type ExpenseOverview = {
  id: string;
  amount: number;
  note: string | null;
  category: ExpenseCategory;
  occurredAt: Date;
};
