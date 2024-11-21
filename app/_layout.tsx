import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Appearance, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { AuthAppBar } from '@/components/authentication/AuthAppBar';
import { SessionProvider } from '@/components/authentication/AuthContext';
import { Colors } from '@/constants/Colors';
import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { Slot } from 'expo-router';
import { MD3DarkTheme, MD3LightTheme, MD3Theme, PaperProvider } from 'react-native-paper';
export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	initialRouteName: 'login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

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
	const [permissionCamera, requestCameraPermission] = useCameraPermissions();
	const [permissionMicrophone, requestMicrophonePermission] = useMicrophonePermissions();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	const permissions = {
		camera: permissionCamera?.granted,
		microphone: permissionMicrophone?.granted,
	};

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		!permissions.camera && requestCameraPermission();
		!permissions.microphone && requestMicrophonePermission();
	}, [permissions.camera, permissions.microphone, requestCameraPermission, requestMicrophonePermission]);

	if (!loaded) {
		return null;
	}

	return (
		<SessionProvider>
			<PaperProvider theme={appTheme as MD3Theme}>
				<AuthAppBar />
				<View style={styles.container}>
					{/* {!permissionCamera?.granted || !permissionMichrophone?.granted ? (
						<View
							style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
							<Text>Precisamos que sejam dadas permissões para acessar sua câmera!</Text>
							<Button onPress={requestPermission}>CONCEDER</Button>
						</View>
					) : (
						<Slot />
					)} */}
					<Slot />
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
