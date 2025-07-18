import { Redirect, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from 'react';
import MonthYearPickerSheet from "@/components/MonthYearPickerSheet";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Redirect href="/(tabs)/dashboard" />
      <Stack screenOptions={{ headerShown: false }} />

      <MonthYearPickerSheet />
    </GestureHandlerRootView>
  );
}
