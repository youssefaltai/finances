import { z } from 'zod';
import { Id, Date, Amount, Currency, IdSchema, DateSchema, AmountSchema, CurrencySchema } from '../../common/types';

// Transaction type enum
export const TransactionTypeSchema = z.enum(['INCOME', 'EXPENSE', 'TRANSFER']);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

// Transaction schema
export const TransactionSchema = z.object({
  id: IdSchema,
  type: TransactionTypeSchema,
  amount: AmountSchema,
  currency: CurrencySchema,
  date: DateSchema,
  description: z.string().min(1),
  categoryId: IdSchema,
  accountId: IdSchema,
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export type Transaction = z.infer<typeof TransactionSchema>;

// Transaction creation schema (without auto-generated fields)
export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTransaction = z.infer<typeof CreateTransactionSchema>; 