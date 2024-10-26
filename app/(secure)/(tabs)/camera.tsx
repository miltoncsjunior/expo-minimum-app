import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import { Box, Button, ButtonText, Image, Pressable } from '@gluestack-ui/themed';
import { CameraMode, CameraType, CameraView } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function ExploreScreen() {
	const ref = useRef<CameraView>(null);
	const [uri, setUri] = useState<string | undefined>(undefined);
	const [mode, setMode] = useState<CameraMode>('picture');
	const [facing, setFacing] = useState<CameraType>('back');
	const [recording, setRecording] = useState(false);

	const takePicture = async () => {
		const photo = await ref.current?.takePictureAsync();
		setUri(photo?.uri);
	};

	const recordVideo = async () => {
		if (recording) {
			setRecording(false);
			ref.current?.stopRecording();
			return;
		}
		setRecording(true);
		const video = await ref.current?.recordAsync();
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
										styles.shutterBtnInner,
										{
											backgroundColor: mode === 'picture' ? 'white' : 'red',
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
