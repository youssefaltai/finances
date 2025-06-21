import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, Pressable } from 'react-native';
import SummaryCard from '@/components/SummaryCard';
import GoalCard from '@/components/GoalCard';
import BudgetCard from '@/components/BudgetCard';
import AccountCard from '@/components/AccountCard';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Money from '@/components/Money';
import MonthYearPickerSheet from '@/components/MonthYearPickerSheet';


const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const YEARS = [2023, 2024, 2025, 2026, 2027];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = React.useState(5); // June (0-based)
  const [selectedYear, setSelectedYear] = React.useState(2025);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Hide the app bar showing the route
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Mock data
  const netWorth = 9711.45;
  const summary = [
    { label: 'Income', value: 12050, type: 'income' },
    { label: 'Expenses', value: 2067.36, type: 'expense' },
  ];
  const goals = [
    { title: 'New Gaming PC', target: 1500, current: 750 },
    { title: 'Summer Trip', target: 800, current: 400 },
    { title: 'New Phone', target: 1000, current: 600 },
  ];
  const budgets = [
    { label: 'Needs', value: 48.62, status: 'available' },
    { label: 'Wants', value: -428.98, status: 'overspent' },
  ];
  const accounts = [
    { label: 'NBE', value: 6271.93 },
    { label: 'HSBC', value: 181.61 },
    { label: 'Cash', value: 3100 },
  ];

  const handleOpenSheet = () => setIsSheetOpen(true);
  const handleCloseSheet = () => setIsSheetOpen(false);
  const handleConfirmSheet = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setIsSheetOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.section]}>
          <Text style={[styles.title, styles.sectionPadding]}>Dashboard</Text>
          <View style={[styles.row, styles.sectionPadding, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.subtitle}>
              Showing data for <Text style={styles.bold}>{MONTHS[selectedMonth]} {selectedYear}</Text>
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
      <MonthYearPickerSheet
        visible={isSheetOpen}
        months={MONTHS}
        years={YEARS}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onConfirm={handleConfirmSheet}
        onClose={handleCloseSheet}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    gap: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#6b7280',
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
  link: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'column',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  netWorth: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  sectionPadding: {
    paddingHorizontal: 16,
  },
  scrollableList: {
    paddingHorizontal: 16,
    gap: 8,
  },
});
