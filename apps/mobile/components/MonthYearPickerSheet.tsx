import React, { useRef, useEffect, useState } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface MonthYearPickerSheetProps {
  visible: boolean;
  months: string[];
  years: number[];
  selectedMonth: number;
  selectedYear: number;
  onConfirm: (month: number, year: number) => void;
  onClose: () => void;
}

const MonthYearPickerSheet: React.FC<MonthYearPickerSheetProps> = ({
  visible,
  months,
  years,
  selectedMonth,
  selectedYear,
  onConfirm,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [localMonth, setLocalMonth] = useState(selectedMonth);
  const [localYear, setLocalYear] = useState(selectedYear);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Select Month & Year</Text>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={localMonth}
              onValueChange={setLocalMonth}
            >
              {months.map((month, idx) => (
                <Picker.Item label={month} value={idx} key={month} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={localYear}
              onValueChange={setLocalYear}
            >
              {years.map((year) => (
                <Picker.Item label={year.toString()} value={year} key={year} />
              ))}
            </Picker>
          </View>
        </View>
        <Pressable
          style={styles.confirmButton}
          onPress={() => onConfirm(localMonth, localYear)}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  pickerContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  pickerWrapper: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MonthYearPickerSheet; 