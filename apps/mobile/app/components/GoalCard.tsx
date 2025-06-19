import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Money from './Money';

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
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    minWidth: 160,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  target: {
    color: '#6b7280',
    fontSize: 12,
  },
  current: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  targetMet: {
    color: '#22c55e',
  },
  targetLeft: {
    color: '#ef4444',
  },
});

export default GoalCard; 