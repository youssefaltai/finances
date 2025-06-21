import React, { useRef, useEffect, useState } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, spacing, typography } from '@finances/design';
import { months, SelectedDate, useMonthPickerStore, years } from '@/store/monthPicker';

const MonthYearPickerSheet: React.FC = () => {
  const { isVisible, options, hide } = useMonthPickerStore();
  const [localDate, setLocalDate] = useState<SelectedDate>(options?.selectedDate ?? { selectedMonth: 0, selectedYear: 0 });
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isVisible && options) {
      setLocalDate(options.selectedDate);
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible, options]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      enablePanDownToClose
      onClose={hide}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView style={styles.content}>
        <Text style={styles.title}>Select Month & Year</Text>
        <View style={styles.pickersContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={localDate.selectedMonth}
              onValueChange={(itemValue) => setLocalDate(prev => ({ ...prev, selectedMonth: itemValue }))}
            >
              {months.map((month, idx) => (
                <Picker.Item label={month} value={idx} key={month} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={localDate.selectedYear}
              onValueChange={(itemValue) => setLocalDate(prev => ({ ...prev, selectedYear: itemValue }))}
            >
              {years.map((year) => (
                <Picker.Item label={year.toString()} value={year} key={year} />
              ))}
            </Picker>
          </View>
        </View>
        <Pressable
          style={styles.confirmButton}
          onPress={() => {
            if (options) {
              options.onConfirm(localDate);
              hide();
            }
          }}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.lg,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.lg,
  },
  pickersContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  pickerWrapper: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  confirmButtonText: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
});

export default MonthYearPickerSheet; 