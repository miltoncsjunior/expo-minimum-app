import { useSession } from '@/components/authentication/AuthContext';
import {
	Box,
	Button,
	ButtonText,
	Center,
	Divider,
	EyeIcon,
	EyeOffIcon,
	FormControl,
	Heading,
	Input,
	InputField,
	InputIcon,
	InputSlot,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function LoginScreen() {
	const { signIn } = useSession();
	const handleLogin = () => {
		signIn();
		router.replace('/');
	};
	const [showPassword, setShowPassword] = useState(false);
	const handleState = () => {
		setShowPassword(showState => {
			return !showState;
		});
	};

	return (
		<Box style={styles.container}>
			<Center>
				<Text style={styles.title}>Olá! 🌈 </Text>
				<Text style={styles.paragraph}>
					Emulador do fluxo de autenticação usando o Expo Router, focado no aspecto de navegação.
				</Text>

				<Divider />

				<FormControl
					p="$4"
					borderWidth="$1"
					borderRadius="$lg"
					borderColor="$borderLight300"
					$dark-borderWidth="$1"
					$dark-borderRadius="$lg"
					$dark-borderColor="$borderDark800">
					<VStack space="xl">
						<Heading color="$text900" lineHeight="$md">
							Autenticação
						</Heading>
						<VStack space="xs">
							<Text color="$text500" lineHeight="$xs">
								Usuário(não requerido)
							</Text>
							<Input>
								<InputField type="text" />
							</Input>
						</VStack>
						<VStack space="xs">
							<Text color="$text500" lineHeight="$xs">
								Senha(não requerido)
							</Text>
							<Input>
								<InputField type={showPassword ? 'text' : 'password'} />
								<InputSlot pr="$3" onPress={handleState}>
									<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
								</InputSlot>
							</Input>
						</VStack>
						<Button ml="auto" onPress={handleLogin}>
							<ButtonText color="$white">Acessar</ButtonText>
						</Button>
					</VStack>
				</FormControl>
			</Center>
		</Box>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		textAlign: 'center',
	},
});
