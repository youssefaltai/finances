import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Money from './Money';

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
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    minWidth: 120,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AccountCard; 