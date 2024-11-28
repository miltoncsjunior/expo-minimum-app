import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Appearance, View } from 'react-native';
import 'react-native-reanimated';

import { AuthAppBar } from '@/components/authentication/AuthAppBar';
import { SessionProvider } from '@/components/authentication/AuthContext';
import { Colors } from '@/constants/Colors';
import { useLog } from '@/hooks/useLog';
import { Slot } from 'expo-router';
import { MD3DarkTheme, MD3LightTheme, MD3Theme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

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
	const insets = useSafeAreaInsets();
	const dynamicStyle = {
		container: {
			paddingTop: -insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right,
			flex: 1,
			backgroundColor: appTheme.colors.background,
		},
	};

	const [loadedFonts] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loadedFonts) {
			SplashScreen.hideAsync();

			useLog.info('App started...');
		}
	}, [loadedFonts]);

	if (!loadedFonts) {
		return null;
	}

	return (
		<SessionProvider>
			<PaperProvider theme={appTheme as MD3Theme}>
				<AuthAppBar />
				<SafeAreaProvider>
					<View style={dynamicStyle.container}>
						<Slot />
					</View>
				</SafeAreaProvider>
			</PaperProvider>
		</SessionProvider>
	);
}
