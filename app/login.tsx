import { useSession } from '@/components/authentication/AuthContext';
import { useLog } from '@/hooks/useLog';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { emailValidator, passwordValidator } from '../core/utils';

export default function LoginScreen() {
	const { signIn } = useSession();

	const [email, setEmail] = useState({ value: '', error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });

	const handleLogin = () => {
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);

		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		}

		signIn();
		router.replace('/');
	};

	useLog.info('Application started...');

	return (
		<View style={styles.container}>
			<Image source={require('@/assets/images/react-logo.png')} style={styles.image} />

			<View>
				<TextInput
					label="Email"
					returnKeyType="next"
					value={email.value}
					onChangeText={text => setEmail({ value: text, error: '' })}
					error={!!email.error}
					autoCapitalize="none"
					autoComplete="email"
					textContentType="emailAddress"
					keyboardType="email-address"
				/>
				<HelperText type="error" visible={email.error.length > 0}>
					{email.error}
				</HelperText>
			</View>

			<View>
				<TextInput
					label="Password"
					returnKeyType="done"
					value={password.value}
					onChangeText={text => setPassword({ value: text, error: '' })}
					error={!!password.error}
					secureTextEntry
				/>

				<HelperText type="error" visible={password.error.length > 0}>
					{password.error}
				</HelperText>
			</View>

			<View style={styles.forgotPassword}>
				<TouchableOpacity>
					<Text>Forgot your password?</Text>
				</TouchableOpacity>
			</View>

			<Button mode="contained" onPress={handleLogin}>
				Login
			</Button>

			<View style={styles.row}>
				<Text>Don’t have an account? </Text>
				<TouchableOpacity>
					<Text style={styles.link}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},
	forgotPassword: {
		width: '100%',
		alignItems: 'flex-end',
		marginBottom: 24,
	},
	row: {
		flexDirection: 'row',
		marginTop: 24,
	},
	link: {
		fontWeight: 'bold',
	},
	image: {
		width: 128,
		height: 128,
		marginBottom: 20,
		alignSelf: 'center',
	},
});
