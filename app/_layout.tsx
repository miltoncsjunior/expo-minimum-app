import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { SessionProvider } from '@/components/authentication/AuthContext';
import { config } from '@gluestack-ui/config';
import { Box, Button, ButtonText, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { useCameraPermissions } from 'expo-camera';
import { Slot } from 'expo-router';

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
	const [permission, requestPermission] = useCameraPermissions();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	if (!permission?.granted) {
		return (
			<Box style={styles.container}>
				<Text>Precisamos que sejam dadas permissões para acessar sua câmera!</Text>
				<Button onPress={requestPermission}>
					<ButtonText>CONCEDER</ButtonText>
				</Button>
			</Box>
		);
	} else {
		return (
			<SessionProvider>
				<GluestackUIProvider config={config}>
					<Slot />
				</GluestackUIProvider>
			</SessionProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
