import { create } from 'zustand';

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const years = [2023, 2024, 2025, 2026, 2027];

export type SelectedDate = {
  selectedMonth: number;
  selectedYear: number;
}

type MonthPickerOptions = {
  selectedDate: SelectedDate;
  onConfirm: (selectedDate: SelectedDate) => void;
};

interface MonthPickerState {
  isVisible: boolean;
  options: MonthPickerOptions | null;
  show: (options: MonthPickerOptions) => void;
  hide: () => void;
}

export const useMonthPickerStore = create<MonthPickerState>((set) => ({
  isVisible: false,
  options: null,
  show: (options) => set({ isVisible: true, options }),
  hide: () => set({ isVisible: false }),
}));
