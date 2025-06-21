import { Tabs } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { colors, spacing, typography } from '@finances/design';

const { width } = Dimensions.get('window');
const FAB_SIZE = 64;

export default function TabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarLabelStyle: {
                        fontWeight: typography.fontWeight.bold,
                    },
                }}
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <Tabs.Screen
                    name="dashboard"
                    options={{
                        title: 'Dashboard',
                        tabBarIcon: ({ color }) => <FontAwesome size={spacing.xxl} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="transactions"
                    options={{
                        title: 'Transactions',
                        tabBarIcon: ({ color }) => <FontAwesome size={spacing.xxl} name="exchange" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="goals"
                    options={{
                        title: 'Goals',
                        tabBarIcon: ({ color }) => <FontAwesome size={spacing.xxl} name="bullseye" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color }) => <FontAwesome size={spacing.xxl} name="cog" color={color} />,
                    }}
                />
            </Tabs>

            <TouchableOpacity style={styles.fab} onPress={() => alert('FAB pressed')}>
                <Ionicons name="add" size={spacing.xxl} color="white" />
            </TouchableOpacity>
        </>
    );
}

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.title || route.name;
                const icon = options.tabBarIcon;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <React.Fragment key={route.key}>
                        <TouchableOpacity
                            accessibilityRole="button"
                            onPress={onPress}
                            style={styles.tab}
                        >
                            {icon?.({ color: isFocused ? colors.primary : colors.text, size: spacing.xxl, focused: isFocused })}
                            <Text style={{ fontSize: typography.fontSize.xs, color: isFocused ? colors.primary : colors.text, marginTop: spacing.xs }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                        {index === 1 && <View style={styles.spacer} />}
                    </React.Fragment>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: spacing.sm,
        paddingBottom: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.text,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    spacer: {
        width: FAB_SIZE,
    },
    fab: {
        position: 'absolute',
        bottom: 54,
        left: (width - FAB_SIZE) / 2,
        width: FAB_SIZE,
        height: FAB_SIZE,
        borderRadius: FAB_SIZE / 2,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});