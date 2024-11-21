import { useSession } from '@/components/authentication/AuthContext';
import FormLayout from '@/components/FormLayout';
import { useLog } from '@/hooks/useLog';
import { Image, useImage } from 'expo-image';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { emailValidator, passwordValidator } from '../core/utils';

export default function LoginScreen() {
	const { signIn } = useSession();

	const [email, setEmail] = useState({ value: '', error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });

	const handleLogin = useCallback(() => {
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);

		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		}

		signIn();
		router.replace('/');
	}, [signIn, email, password]);

	const image = useImage(require('@/assets/images/react-logo.png'), {
		onError(error, retry) {
			useLog.error('Loading failed:' + error.message);
		},
	});

	useEffect(() => {
		useLog.info('Login screen started...');
	}, []);

	if (!image) {
		return <Text>Image is loading...</Text>;
	}

	return (
		<FormLayout>
			<Image source={image} style={styles.image} />

			<View>
				<TextInput
					mode="outlined"
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
					mode="outlined"
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
		</FormLayout>
	);
}

const styles = StyleSheet.create({
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
