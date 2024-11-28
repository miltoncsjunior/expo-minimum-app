import { useMemo, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { SessionProvider, useSession } from './AuthContext';

export function AuthAppBar() {
	const { session, signOut } = useSession();
	const [signedIn, setSignedIn] = useState(false);

	useMemo(() => {
		setSignedIn(session !== null && session !== undefined);
	}, [session]);

	return (
		<SessionProvider>
			<Appbar.Header>
				<Appbar.Content title="Expo Minimum App" />
				{signedIn && <Appbar.Action isLeading icon="logout" onPress={() => signOut()} />}
			</Appbar.Header>
		</SessionProvider>
	);
}
