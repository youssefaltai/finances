import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Money from './Money';

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
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    minWidth: 140,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  income: {
    color: '#22c55e',
  },
  expense: {
    color: '#ef4444',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SummaryCard; 