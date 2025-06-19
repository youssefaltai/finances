import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Money from './Money';

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
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    minWidth: 140,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  available: {
    color: '#22c55e',
  },
  overspent: {
    color: '#ef4444',
  },
});

export default BudgetCard; 