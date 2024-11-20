import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Appearance, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { AuthAppBar } from '@/components/authentication/AuthAppBar';
import { SessionProvider } from '@/components/authentication/AuthContext';
import { Colors } from '@/constants/Colors';
import { useCameraPermissions } from 'expo-camera';
import { Slot } from 'expo-router';
import { Button, MD3DarkTheme, MD3LightTheme, MD3Theme, PaperProvider, Text } from 'react-native-paper';
export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	initialRouteName: 'login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const colorScheme = Appearance.getColorScheme();

const dynamicTheme =
	// Generate in https://callstack.github.io/react-native-paper/docs/guides/theming/#simple-built-in-theme-overrides
	colorScheme === 'dark'
		? {
				...MD3DarkTheme,
				colors: Colors.dark,
			}
		: {
				...MD3LightTheme,
				colors: Colors.light,
			};

const appTheme = {
	...dynamicTheme,
	roundness: 1,
	mode: 'exact',
};

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

	return (
		<SessionProvider>
			<PaperProvider theme={appTheme as MD3Theme}>
				<AuthAppBar />
				<View style={styles.container}>
					{!permission?.granted ? (
						<>
							<Text>Precisamos que sejam dadas permissões para acessar sua câmera!</Text>
							<Button onPress={requestPermission}>CONCEDER</Button>
						</>
					) : (
						<Slot />
					)}
				</View>
			</PaperProvider>
		</SessionProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: appTheme.colors.background,
	},
});
