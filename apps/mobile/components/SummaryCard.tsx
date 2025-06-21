import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Money from './Money';
import { colors, spacing, typography } from '@finances/design';

interface SummaryCardProps {
  label: string;
  value: number;
  type: 'income' | 'expense';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, type }) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.label, type === 'income' ? styles.income : styles.expense]}>
        {type === 'income' ? '▲' : '▼'} {label}
      </Text>
      <Money style={styles.value} value={value}/>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    padding: spacing.lg,
    minWidth: 140,
  },
  label: {
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  income: {
    color: colors.success,
  },
  expense: {
    color: colors.danger,
  },
  value: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
});

export default SummaryCard; 