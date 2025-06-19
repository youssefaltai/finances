import { z } from 'zod';

// Common ID type
export const IdSchema = z.string().uuid();
export type Id = z.infer<typeof IdSchema>;

// Common date type
export const DateSchema = z.string().datetime();
export type Date = z.infer<typeof DateSchema>;

// Common amount type for money
export const AmountSchema = z.number().positive();
export type Amount = z.infer<typeof AmountSchema>;

// Common currency type
export const CurrencySchema = z.enum(['USD', 'EUR', 'GBP']);
export type Currency = z.infer<typeof CurrencySchema>; 