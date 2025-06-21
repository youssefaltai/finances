import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Money from './Money';
import { colors, spacing, typography } from '@finances/design';

interface GoalCardProps {
  title: string;
  target: number;
  current: number;
}

const GoalCard: React.FC<GoalCardProps> = ({ title, target, current }) => {
  const isTargetMet = current >= target && target > 0;
  const left = target > 0 ? target - current : 0;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Money style={styles.target} value={target} />
      <Money style={styles.current} value={current} />
      {target > 0 ? (
        <Text style={[styles.status, isTargetMet ? styles.targetMet : styles.targetLeft]}>
          {isTargetMet ? 'Target met' : `£${Math.abs(left).toLocaleString('en-GB')} EGP left`}
        </Text>
      ) : (
        <Text style={[styles.status, styles.targetMet]}>Target</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    padding: spacing.lg,
    minWidth: 160,
  },
  title: {
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  target: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
  },
  current: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xs,
  },
  status: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  targetMet: {
    color: colors.success,
  },
  targetLeft: {
    color: colors.danger,
  },
});

export default GoalCard; 