import { Tabs } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');
const FAB_SIZE = 64;

export default function TabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                }}
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <Tabs.Screen
                    name="dashboard"
                    options={{
                        title: 'Dashboard',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="transactions"
                    options={{
                        title: 'Transactions',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="exchange" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="goals"
                    options={{
                        title: 'Goals',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="bullseye" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    }}
                />
            </Tabs>

            <TouchableOpacity style={styles.fab} onPress={() => alert('FAB pressed')}>
                <Ionicons name="add" size={28} color="white" />
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
                            {icon?.({ color: isFocused ? '#2563eb' : '#888', size: 28, focused: isFocused })}
                            <Text style={{ fontSize: 12, color: isFocused ? '#2563eb' : '#888', marginTop: 4 }}>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderTopColor: '#000'
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
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});