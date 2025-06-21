import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Money from './Money';
import { colors, spacing, typography } from '@finances/design';

interface AccountCardProps {
  label: string;
  value: number;
}

const AccountCard: React.FC<AccountCardProps> = ({ label, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
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
    minWidth: 120,
  },
  label: {
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  value: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.md,
  },
});

export default AccountCard; 