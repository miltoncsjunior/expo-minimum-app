import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/components/authentication/AuthContext';

export default function SecureLayout() {
	const { session } = useSession();

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		return <Redirect href="/login" />;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
