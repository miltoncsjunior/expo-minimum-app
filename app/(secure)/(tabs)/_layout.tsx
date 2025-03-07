import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: 'Explore',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="camera"
				options={{
					title: 'Câmera',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'camera' : 'camera-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="local-db"
				options={{
					title: 'Banco de dados local',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'server' : 'server-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="log-viewer"
				options={{
					title: 'Logs',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'document' : 'document-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="map"
				options={{
					title: 'Mapa',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
