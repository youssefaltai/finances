import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, Pressable } from 'react-native';
import SummaryCard from '@/components/SummaryCard';
import GoalCard from '@/components/GoalCard';
import BudgetCard from '@/components/BudgetCard';
import AccountCard from '@/components/AccountCard';
import { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Money from '@/components/Money';
import { months, SelectedDate, useMonthPickerStore } from '@/store/monthPicker';
import { colors, spacing, typography } from '@finances/design';

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();
const currentDate: SelectedDate = {
  selectedMonth: currentMonth,
  selectedYear: currentYear,
};

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const { show } = useMonthPickerStore();

  // Hide the app bar showing the route
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Mock data
  const netWorth = 97118.45;
  const summary = [
    { label: 'Income', value: 120500, type: 'income' },
    { label: 'Expenses', value: 20673.36, type: 'expense' },
  ];
  const goals = [
    { title: 'House Down Payment', target: 103630, current: 96000 },
    { title: 'Furniture', target: 0, current: 0 },
  ];
  const budgets = [
    { label: 'Needs', value: 486.62, status: 'available' },
    { label: 'Wants', value: -4289.98, status: 'overspent' },
  ];
  const accounts = [
    { label: 'NBE', value: 62717.93 },
    { label: 'HSBC', value: 1816.61 },
    { label: 'Cash', value: 31000 },
  ];

  const handleOpenSheet = () => {
    show({
      selectedDate,
      onConfirm: (newSelectedDate) => {
        setSelectedDate(newSelectedDate);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.section]}>
          <Text style={[styles.title, styles.sectionPadding]}>Dashboard</Text>
          <View style={[styles.row, styles.sectionPadding, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.subtitle}>
              Showing data for <Text style={styles.bold}>{months[selectedDate.selectedMonth]} {selectedDate.selectedYear}</Text>
            </Text>
            <Pressable onPress={handleOpenSheet} hitSlop={8} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
              <Text style={styles.link}>Change</Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.section]}>
          <Text style={[styles.sectionTitle, styles.sectionPadding]}>Net Worth</Text>
          <Money value={netWorth} style={[styles.netWorth, styles.sectionPadding]} />
        </View>
        <View style={[styles.section]}>
          <Text style={[styles.sectionTitle, styles.sectionPadding]}>Summary</Text>
          <View style={[styles.row, styles.sectionPadding]}>
            {summary.map((item) => (
              <SummaryCard
                type={item.type as 'income' | 'expense'}
                label={item.label}
                value={item.value}
                key={item.label} />
            ))}
          </View>
        </View>
        <View style={[styles.section]}>
          <Text style={[styles.sectionTitle, styles.sectionPadding]}>Goals</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={goals}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <GoalCard
                title={item.title}
                target={item.target}
                current={item.current}
              />
            )}
            contentContainerStyle={styles.scrollableList}
          />
        </View>
        <View style={[styles.section]}>
          <Text style={[styles.sectionTitle, styles.sectionPadding]}>Budgets</Text>
          <View style={[styles.row, styles.sectionPadding]}>
            {budgets.map((budget) => (
              <BudgetCard
                status={budget.status as 'available' | 'overspent'}
                label={budget.label}
                value={budget.value}
                key={budget.label} />
            ))}
          </View>
        </View>
        <View style={[styles.section]}>
          <Text style={[styles.sectionTitle, styles.sectionPadding]}>Accounts</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={accounts}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => (
              <AccountCard
                label={item.label}
                value={item.value}
              />
            )}
            contentContainerStyle={styles.scrollableList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    gap: spacing.xxl,
    paddingBottom: spacing.xxl * 2,
  },
  title: {
    fontSize: typography.fontSize.header,
    fontWeight: typography.fontWeight.bold,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  bold: {
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  link: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  section: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  netWorth: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  sectionPadding: {
    paddingHorizontal: spacing.lg,
  },
  scrollableList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
});
