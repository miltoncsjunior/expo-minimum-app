import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { SessionProvider } from '@/components/authentication/AuthContext';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { useCameraPermission } from 'react-native-vision-camera';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	initialRouteName: 'login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { hasPermission, requestPermission } = useCameraPermission();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	function askPermissions() {
		if (!hasPermission) {
			requestPermission();
		}
	}

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			askPermissions();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<SessionProvider>
			<GluestackUIProvider config={config}>
				<Slot />
			</GluestackUIProvider>
		</SessionProvider>
	);
}
