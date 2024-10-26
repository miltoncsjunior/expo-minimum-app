import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/components/authentication/AuthContext';
import { config } from '@gluestack-ui/config';
import { Button, ButtonText, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { useColorScheme } from 'react-native';

export default function SecureLayout() {
	const colorScheme = useColorScheme();
	const { session, isLoading, signOut } = useSession();
	// You can keep the splash screen open, or render a loading screen like we do here.
	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		return <Redirect href="/login" />;
	}

	return (
		<GluestackUIProvider config={config}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
			<Button
				onPress={() => {
					signOut();
				}}>
				<ButtonText>Sign Out</ButtonText>
			</Button>
		</GluestackUIProvider>
	);
}
