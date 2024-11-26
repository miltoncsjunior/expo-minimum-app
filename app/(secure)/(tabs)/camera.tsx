import { useLog } from '@/hooks/useLog';
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import { Box, Button, ButtonText, Image, Pressable } from '@gluestack-ui/themed';
import { CameraMode, CameraType, CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function CameraScreen() {
	const [permissionCamera, requestCameraPermission] = useCameraPermissions();
	const [permissionMicrophone, requestMicrophonePermission] = useMicrophonePermissions();

	const ref = useRef<CameraView>(null);
	const [uri, setUri] = useState<string | undefined>(undefined);
	const [mode, setMode] = useState<CameraMode>('picture');
	const [facing, setFacing] = useState<CameraType>('back');
	const [recording, setRecording] = useState(false);

	const permissions = {
		camera: permissionCamera?.granted,
		microphone: permissionMicrophone?.granted,
	};

	useEffect(() => {
		if (!permissions.camera || !permissions.microphone) {
			useLog.info('Permissions requested...');
		}

		!permissions.camera && requestCameraPermission();
		!permissions.microphone && requestMicrophonePermission();
	}, [permissions.camera, permissions.microphone, requestCameraPermission, requestMicrophonePermission]);

	const takePicture = async () => {
		if (!permissions.camera) {
			useLog.info('Permissions denied...');
			return;
		}

		const photo = await ref.current?.takePictureAsync({
			quality: 1,
			base64: true,
			skipProcessing: true,
			exif: true,
		});
		setUri(photo?.uri);
	};

	const recordVideo = async () => {
		if (!permissions.camera || !permissions.microphone) {
			useLog.info('Permissions denied...');
			return;
		}

		if (recording) {
			setRecording(false);
			ref.current?.stopRecording();
			return;
		}
		setRecording(true);
		const video = await ref.current?.recordAsync();
		setUri(video?.uri);
	};

	const toggleMode = () => {
		setMode(prev => (prev === 'picture' ? 'video' : 'picture'));
	};

	const toggleFacing = () => {
		setFacing(prev => (prev === 'back' ? 'front' : 'back'));
	};

	const renderPicture = () => {
		return (
			<Box>
				<Image source={{ uri }} size="2xl" alt="Imagem capturada" />
				<Button onPress={() => setUri(undefined)}>
					<ButtonText>Nova captura</ButtonText>
				</Button>
			</Box>
		);
	};

	const renderCamera = () => {
		return (
			<CameraView
				style={styles.camera}
				ref={ref}
				mode={mode}
				facing={facing}
				mute={false}
				responsiveOrientationWhenOrientationLocked>
				<Box style={styles.shutterContainer}>
					<Pressable onPress={toggleMode}>
						{mode === 'picture' ? (
							<AntDesign name="picture" size={32} color="white" />
						) : (
							<Feather name="video" size={32} color="white" />
						)}
					</Pressable>
					<Pressable onPress={mode === 'picture' ? takePicture : recordVideo}>
						{({ pressed }) => (
							<Box
								style={[
									styles.shutterBtn,
									{
										opacity: pressed ? 0.5 : 1,
									},
								]}>
								<Box
									style={[
										{
											backgroundColor: mode === 'picture' ? 'white' : 'red',
											width: mode === 'video' && recording ? 30 : 70,
											height: mode === 'video' && recording ? 30 : 70,
											borderRadius: mode === 'video' && recording ? 2 : 50,
										},
									]}
								/>
							</Box>
						)}
					</Pressable>
					<Pressable onPress={toggleFacing}>
						<FontAwesome6 name="rotate-left" size={32} color="white" />
					</Pressable>
				</Box>
			</CameraView>
		);
	};

	useEffect(() => {
		useLog.info('Camera screen started...');
	}, []);

	return <Box style={styles.container}>{uri ? renderPicture() : renderCamera()}</Box>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
		width: '100%',
	},
	shutterContainer: {
		position: 'absolute',
		bottom: 44,
		left: 0,
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 30,
	},
	shutterBtn: {
		backgroundColor: 'transparent',
		borderWidth: 5,
		borderColor: 'white',
		width: 85,
		height: 85,
		borderRadius: 45,
		alignItems: 'center',
		justifyContent: 'center',
	},
	shutterBtnInner: {
		width: 70,
		height: 70,
		borderRadius: 50,
	},
});
