import { Transaction, CreateTransaction, TransactionType } from './types';
import { roundToTwoDecimals } from '../../common/utils';

/**
 * Calculate the total amount for a list of transactions
 */
export const calculateTotalAmount = (transactions: Transaction[]): number => {
  return roundToTwoDecimals(
    transactions.reduce((total, transaction) => {
      const amount = transaction.amount;
      return total + (transaction.type === 'EXPENSE' ? -amount : amount);
    }, 0)
  );
};

/**
 * Group transactions by type
 */
export const groupTransactionsByType = (transactions: Transaction[]): Record<TransactionType, Transaction[]> => {
  return transactions.reduce(
    (groups, transaction) => {
      groups[transaction.type].push(transaction);
      return groups;
    },
    {
      INCOME: [] as Transaction[],
      EXPENSE: [] as Transaction[],
      TRANSFER: [] as Transaction[],
    }
  );
};

/**
 * Filter transactions by date range
 */
export const filterTransactionsByDateRange = (
  transactions: Transaction[],
  startDate: string,
  endDate: string
): Transaction[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return transactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    }
  );
}; 