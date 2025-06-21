import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Money from './Money';
import { colors, spacing, typography } from '@finances/design';

interface BudgetCardProps {
  label: string;
  value: number;
  status: 'available' | 'overspent';
}

const BudgetCard: React.FC<BudgetCardProps> = ({ label, value, status }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Money style={styles.value} value={value}/>
      <Text style={[styles.status, status === 'available' ? styles.available : styles.overspent]}>
        {status === 'available' ? 'Available' : 'Overspent'}
      </Text>
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
  value: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xs,
  },
  status: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  available: {
    color: colors.success,
  },
  overspent: {
    color: colors.danger,
  },
});

export default BudgetCard; 