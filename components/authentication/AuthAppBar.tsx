import { useEffect, useState } from 'react';
import { Appbar, Text } from 'react-native-paper';
import { SessionProvider, useSession } from './AuthContext';

export function AuthAppBar() {
	const { session, signOut, isLoading } = useSession();
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		setSignedIn(session !== null && session !== undefined);
	}, [session]);

	// You can keep the splash screen open, or render a loading screen like we do here.
	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	return (
		<SessionProvider>
			<Appbar.Header>
				<Appbar.Content title="Expo Minimum App" />
				{signedIn && <Appbar.Action isLeading icon="logout" onPress={() => signOut()} />}
			</Appbar.Header>
		</SessionProvider>
	);
}
